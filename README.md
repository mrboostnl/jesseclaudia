# Jesse & Claudia Hoeré, website

Statische one-pager. Geen build-stap nodig: alles draait vanuit `index.html`.

## Structuur

- `index.html`: de hele site (HTML, CSS en JavaScript)
- `img/`: uitgeknipte foto's en de dieptekaart van de hero (`herodepth-cut.webp`)
- `vid/`: korte stille loops (autoplay)
- `video/`: versies met geluid voor de popups (`tt1` t/m `tt7`) en de twee videoclips (`clip1`, `clip2`)
- `fonts/`: Poppins en Caveat, lokaal
- `js/`: GSAP, ScrollTrigger en Physics2D, lokaal

## Op Vercel zetten

1. Maak een nieuwe repository op GitHub en upload de inhoud van deze map (dus `index.html` in de root van de repo).
2. Ga in Vercel naar Add New, Project en kies de repository.
3. Framework Preset: Other. Build Command en Output Directory leeg laten.
4. Deploy.

## Nog in te vullen

Bovenaan het laatste `<script>` in `index.html` staat `CONFIG`:

- `bookingEmail`: het boekingsadres. Zolang dit leeg is, toont het formulier een demo-melding. Met een adres opent het formulier een kant-en-klare e-mail.
- `tiktokUrl`: link naar het officiële TikTok-account voor de "Volg ons"-knop.
- `stats.tiktok` en `stats.instagram`: volgersaantallen als tekst (bijvoorbeeld `'85K'`). Die vervangen de derde en vierde kaart bij "Twee stemmen. Eén groot feest."

In de footer staan tekstknoppen voor Spotify, YouTube en TikTok. Bij elke link staat een opmerking waar het officiële logo kan komen.

## Goed om te weten

- Op een eigen domein laadt de site onder de playlist ook de ingebedde Spotify-spelers van Jesse en Claudia. In de Claude-preview was dat geblokkeerd.
- De cijfers (YouTube-views, Spotify-luisteraars) zijn een momentopname van november 2026.
