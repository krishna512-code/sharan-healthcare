# Sharan Healthcare — Premium Surgeon Website

A standalone responsive landing website for Sharan Healthcare / Dr. Mohnish Kumar.

## Included
- Premium 2026 bento/editorial UI
- CSS 3D medical hero and appointment avatar presentation
- Scroll reveal, cursor glow, magnetic buttons and micro-interactions
- Surgical expertise modal system
- Appointment request flow to WhatsApp
- Google Maps embed + Google profile link
- Instagram link
- Responsive mobile bottom actions
- SEO metadata + Physician structured data
- Accessibility and reduced-motion handling

## Source assets
- `assets/sharan-logo.png` — supplied Sharan Healthcare logo
- `assets/dr-mohnish.png` — supplied doctor image
- `assets/dr-mohnish-banner.png` — supplied doctor/banner image
- `assets/appointment-reference.png` — generated appointment concept reference

## Run locally
Open `index.html` directly, or run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Production notes
The appointment form currently prepares a WhatsApp request. Connect it to the clinic's actual backend/CRM if you need database storage, admin management, confirmations or audit logs.

Do not publish unverified testimonials, success rates, experience counts, awards or medical claims.
