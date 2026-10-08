# Sharan Healthcare — Premium Surgeon Website

A standalone responsive landing website for Sharan Healthcare / Dr. Mohnish Kumar.

## Included
- Premium 2026 bento/editorial UI
- CSS 3D medical hero and appointment avatar presentation
- Scroll reveal, cursor glow, magnetic buttons and micro-interactions
- Surgical expertise modal system
- Appointment request form with on-page confirmation and reference ID
- Google Maps embed + Google profile link
- Instagram link
- Responsive mobile bottom actions
- SEO metadata + Physician structured data
- Accessibility and reduced-motion handling

## Source assets
- `assets/sharan-logo.png` — supplied Sharan Healthcare logo
- `assets/dr-mohnish-scrubs.jpg` — hero portrait (blue scrubs)
- `assets/dr-mohnish-coat.jpg` — doctor section portrait (white coat)
- `assets/dr-mohnish-desk.jpg` — appointment section photo (at desk)
- `assets/dr-mohnish-ot.jpg` — laparoscopy section photo (operating theatre)
- `assets/appointment-reference.png` — generated appointment concept reference

## Run locally
Open `index.html` directly, or run:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Production notes
The appointment form currently records the request on-page with a reference ID. Connect it to the clinic's actual backend/CRM if you need persistent storage, admin management, confirmations or audit logs.

Do not publish unverified testimonials, success rates, experience counts, awards or medical claims.
