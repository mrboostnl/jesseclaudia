# Jesse & Claudia Hoeré, website

Statische one-pager. Er is geen build-stap, database of server-software nodig: alles draait vanuit `index.html`.

## Structuur

- `index.html`: de hele site (HTML, CSS en JavaScript)
- `img/`: uitgeknipte foto's en de dieptekaart van de hero (`herodepth-cut.webp`)
- `vid/`: korte stille loops (autoplay)
- `video/`: versies met geluid voor de popups (`tt1` t/m `tt7`) en de twee videoclips (`clip1`, `clip2`)
- `fonts/`: Poppins en Caveat, lokaal
- `js/`: GSAP, ScrollTrigger en Physics2D, lokaal

## Zelf hosten

Upload de volledige inhoud van deze map naar de webroot van de hosting (vaak `public_html` of `www`), zodat `index.html` direct in de root staat en de mappen ernaast. Dat kan via FTP/SFTP of de bestandsbeheerder van de hostingpartij.

- De mapstructuur en bestandsnamen moeten gelijk blijven; de site verwijst er met relatieve paden naar.
- De site moet via `https://` worden geserveerd.
- De hosting moet `.mp4`, `.webp` en `.woff2` als gewone bestanden uitleveren (standaard bij vrijwel elke host).
- Totale grootte: ongeveer 62 MB, waarvan het grootste deel video.

Op Vercel of Netlify kan het ook: importeer de map als project met Framework Preset "Other" en laat de build-instellingen leeg.

## Nog in te vullen

Bovenaan het laatste `<script>` in `index.html` staat `CONFIG`:

- `bookingEmail`: het boekingsadres. Zolang dit leeg is, toont het formulier een demo-melding. Met een adres opent het formulier een kant-en-klare e-mail in het mailprogramma van de bezoeker.
- `tiktokUrl`: link naar het officiële TikTok-account voor de "Volg ons"-knop.
- `stats.tiktok` en `stats.instagram`: volgersaantallen als tekst (bijvoorbeeld `'85K'`). Die vervangen de derde en vierde kaart bij "Twee stemmen. Eén groot feest."

In de footer staan tekstknoppen voor Spotify, YouTube en TikTok. Bij de links staat een opmerking waar het officiële logo kan komen.

## Goed om te weten

- Op een eigen domein laadt de site onder de playlist ook de ingebedde Spotify-spelers van Jesse en Claudia.
- De cijfers (YouTube-views, Spotify-luisteraars) en de prijzen zijn een momentopname van november 2026 en staan als tekst in `index.html`.

## Automatische tracklijst (Spotify)

De lijst bij "Zet 'm aan" vraagt bij het laden `api/tracks` op. Dat is de functie in `api/tracks.js`: die haalt de releases van Jesse en Claudia op bij Spotify, nieuwste eerst. Een nieuwe release staat daardoor binnen ongeveer een uur vanzelf op de site.

Eenmalig instellen (alleen op Vercel, daar draait `api/` automatisch):

1. Maak op developer.spotify.com een app aan. Het Spotify-account van de eigenaar moet Premium hebben.
2. Zet de Client ID en Client Secret in Vercel bij Settings > Environment Variables als `SPOTIFY_CLIENT_ID` en `SPOTIFY_CLIENT_SECRET`.
3. Deploy opnieuw en open `/api/tracks` in de browser: daar hoort een lijst met nummers te staan.

Zonder deze stappen, of op hosting zonder Vercel-functies, blijft de vaste lijst staan (`TRACKS` in `index.html`). De site gaat daar niet stuk van.

- `maxTracks` in `CONFIG` bepaalt hoeveel nummers er maximaal staan (standaard 10).
- Zet de Client Secret nooit in `index.html` of in GitHub.
