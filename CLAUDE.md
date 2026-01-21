# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Odoo 19 Community Edition project with custom accounting modules. The project root (`/home/suisse`) serves as the custom addons directory.

## Commands

```bash
# Service management
sudo systemctl start suisse
sudo systemctl stop suisse
sudo systemctl restart suisse
sudo systemctl status suisse

# Manual start (for debugging)
/home/shared/odoo19/venv/bin/python3 /home/shared/odoo19/odoo/odoo-bin -c .odoo/odoo.conf

# View logs
tail -f .odoo/logs/odoo.log

# Update a specific module (replace MODULE_NAME)
/home/shared/odoo19/venv/bin/python3 /home/shared/odoo19/odoo/odoo-bin -c .odoo/odoo.conf -u MODULE_NAME --stop-after-init
```

## Architecture

### Custom Modules

- **base_account_budget** - Budget management for analytic accounts. Dependency: `base`, `account`
- **base_accounting_kit** - Full accounting suite with reports, assets, PDC, follow-ups, bank reconciliation. Depends on `base_account_budget`. External Python deps: `openpyxl`, `ofxparse`, `qifparse`

### Key Paths

- **Odoo Core:** `/home/shared/odoo19/odoo/`
- **Python venv:** `/home/shared/odoo19/venv/`
- **Config:** `.odoo/odoo.conf`
- **Logs:** `.odoo/logs/odoo.log`
- **Filestore:** `.odoo/data/`
- **Addons Path:** `/home/shared/odoo19/odoo/addons`, `/home/suisse`

### Database

- **User:** `suisse`
- **Port:** 8069 (HTTP), 7069 (gevent/longpolling)

## Odoo Module Development

Standard Odoo 19 module structure:
```
module_name/
├── __init__.py
├── __manifest__.py
├── models/
├── views/
├── security/
├── data/
├── report/
├── wizard/
└── static/
```

After creating or modifying modules, restart the service and update the module via Odoo's Apps menu or CLI.
