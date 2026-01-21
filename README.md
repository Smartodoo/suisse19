# suisse

Odoo 19 Community Project

## Version Info

- **Odoo Version:** 19 (CE)
- **Created on:** 2026-01-13 02:42:10

## Quick Start

```bash
# Start the server manually
cd /home/suisse
/home/shared/odoo19/venv/bin/python3 /home/shared/odoo19/odoo/odoo-bin -c .odoo/odoo.conf

# Access Odoo
http://localhost:8069
```

## Credentials

All credentials are stored in `.odoo/odoo.conf`

- **Admin Username:** admin
- **Admin Password:** See `.odoo/odoo.conf` (initially: admin)
- **Master Password:** See `admin_passwd` in `.odoo/odoo.conf`

**Security Note:** The `.odoo/` directory is gitignored to keep credentials private.

## Project Structure

```
suisse/
├── .odoo/              # Runtime files (gitignored)
│   ├── odoo.conf      # Configuration
│   ├── logs/          # Log files
│   └── data/          # Filestore
└── your_module/       # Custom addons (project root)
```

## Development

Create custom modules directly in the project root:

```bash
cd /home/suisse
mkdir my_custom_module
# Develop your Odoo module here
```

## Service Management (Ubuntu)

```bash
# Using systemd
sudo systemctl start suisse
sudo systemctl stop suisse
sudo systemctl restart suisse
sudo systemctl status suisse

# View logs
tail -f .odoo/logs/odoo.log
```

## Configuration

Edit `.odoo/odoo.conf` to customize:
- Port numbers
- Database settings
- Worker configuration
- Log levels
