# PoojaSeva — English Website

Responsive single-page poojari booking website built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — English website content and booking form
- `style.css` — responsive royal devotional styling
- `script.js` — navigation, service selection, validation and WhatsApp message generation

## Configure WhatsApp before publishing
Open `script.js` and replace:
`const WHATSAPP_NUMBER = "91XXXXXXXXXX";`
with your real business WhatsApp number including country code, digits only. Example format: `919876543210`.

The form opens WhatsApp with a prefilled booking request. The visitor must press Send. This is not a database-backed booking system and does not automatically confirm a priest's availability.

## Preview locally
Open `index.html` in your browser, or use VS Code Live Server.

## Deploy to Vercel
1. Upload all three files to the root of a GitHub repository.
2. In Vercel choose **Add New → Project** and import the repository.
3. Choose **Other** as the framework preset. Leave the build command empty and use the repository root as the output directory.
4. Click **Deploy**.

## Connect your GoDaddy domain
1. In Vercel, open **Project → Settings → Domains** and add your domain (and optionally `www`).
2. Follow the exact DNS records Vercel displays.
3. In GoDaddy **Domain Portfolio → your domain → DNS**, add or update the required records.
4. Do not remove MX/TXT records needed for email.
5. Return to Vercel and wait for domain verification and HTTPS.

## Production considerations
The current form creates a WhatsApp message but does not store booking submissions. For reliable booking records, connect a backend/API and database or a form service. Add a privacy notice, cancellation policy, accurate prices and service areas, and only publish verified priest profiles, reviews and testimonials.

The page uses externally hosted image URLs and Google Fonts. Confirm image licensing and loading before launch.
