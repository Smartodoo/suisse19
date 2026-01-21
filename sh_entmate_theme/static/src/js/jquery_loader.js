/** @odoo-module **/

// Safe jQuery loader for Odoo 19
// This module provides jQuery that can be imported by other modules

export function getJQuery() {
    if (typeof window !== 'undefined' && window.jQuery) {
        return window.jQuery;
    }
    if (typeof jQuery !== 'undefined') {
        return jQuery;
    }
    return null;
}

export const $ = getJQuery();
