# suisse

Odoo 19 Community Project

## Quick Start

```bash
# Start the server
./start.sh

# Access Odoo
http://localhost:8091
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
├── .odoo_version      # Version tracking
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
# Using systemd (if configured)
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

---

Generated with [Claude Code](https://claude.com/claude-code)
