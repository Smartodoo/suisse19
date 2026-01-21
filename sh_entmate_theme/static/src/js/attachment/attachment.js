/* @odoo-module */
import { ListRenderer } from "@web/views/list/list_renderer";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";
import { ListController } from "@web/views/list/list_controller";
import { ActionMenus } from "@web/search/action_menus/action_menus";
import { session } from "@web/session";
import { _t } from "@web/core/l10n/translation";

const { onMounted, onWillStart } = owl;
const $ = window.jQuery;

// Open Record feature Access Variable
var show_open_record_new_tab_button = session.sh_enable_open_record_in_new_tab || false;

patch(ActionMenus.prototype, {
    setup() {
        super.setup();
        this.show_open_record_new_tab_button_action = show_open_record_new_tab_button;
    },

    onOpenRecord() {
        let record_activeIds = this.props.getActiveIds();
        for (var j in record_activeIds) {
            var url = window.location.href;
            var latest_url = url + "&id=" + record_activeIds[j];
            let result = latest_url.replace("view_type=list", "view_type=form");
            window.open(result, "_blank");
        }
    },
});

patch(ListRenderer.prototype, {

    setup() {
        super.setup();
        this.dialogService = useService("dialog");
        this.orm = useService("orm");
        this.notificationService = useService("notification");

        // Open Record Code
        this.show_open_record_new_tab_button_listrenderer = show_open_record_new_tab_button;
        this.is_list_view = true;
        var Many2one_protect = this.env?.config?.actionType;
        var view_type = this.props?.activeActions?.type;
        if (view_type != "view" || Many2one_protect == false) {
            this.is_list_view = false;
        }

        onWillStart(async () => {
            try {
                const data = await this.orm.call('res.users', 'get_attachment_data', [this.props.list.resModel, this.props.list.records.map((rec) => rec.resId)], {});
                this.sh_attachments = data[0];
                this.sh_show_attachment_in_list_view = data[1];
            } catch (e) {
                console.log("Error loading attachment data:", e);
            }
        });
        onMounted(() => this.onMountedAttachment());
    },

    onMountedAttachment() {
        if (show_open_record_new_tab_button) {
            if (this.is_list_view) {
                var trElements = $("table tr:not([class])");
                var header = trElements.first();
                var table_header = $("<th>Open</th>");
                if (header.children().length > 0) {
                    header.children().eq(0).after(table_header);
                }
                var footer = trElements.last();
                var table_footer = $("<td></td>");
                if (footer.children().length > 0) {
                    footer.children().eq(0).after(table_footer);
                }

                var trsWithColspan6 = $('tr:has(td[colspan])');
                if (trsWithColspan6) {
                    trsWithColspan6.each(function () {
                        $(this).append('<td></td>');
                    });
                }
            }
        }
    },

    OpenRecord(res_id) {
        var url = window.location.href;
        var latest_url = url + "&id=" + res_id;
        let result = latest_url.replace("view_type=list", "view_type=form");
        window.open(result, "_blank");
    },

    _shloadattachmentviewer: function (ev) {
        let attachment_id = parseInt($(ev.currentTarget).data("id"));
        let record_id = parseInt($(ev.currentTarget).data("record_id"));
        let attachment_mimetype = $(ev.currentTarget).data("mimetype");
        let mimetype_match = attachment_mimetype.match("(image|application/pdf|text|video)");

        if (mimetype_match) {
            // Download the attachment as fallback
            window.open("/web/content/" + attachment_id + "?download=true", "_blank");
        } else {
            this.notificationService.add(_t("Preview for this file type can not be shown"), {
                title: _t("File Format Not Supported"),
                type: 'danger',
                sticky: false
            });
        }
    }
});
