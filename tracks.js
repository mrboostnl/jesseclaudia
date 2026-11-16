// Vercel-functie: haalt de releases van Jesse en Claudia op bij Spotify en geeft ze als lijst terug.
// De site vraagt deze lijst op bij het laden; een nieuwe release staat daardoor vanzelf in "Zet 'm aan".
// Nodig in Vercel (Settings > Environment Variables): SPOTIFY_CLIENT_ID en SPOTIFY_CLIENT_SECRET.
const ARTISTS = { jesse: '5AcEJsrjeoYnZ0T3e67FFH', claudia: '5EdlZG9RnBQckxI3IyXcj2' };
const API = 'https://api.spotify.com/v1';

async function token() {
  const id = process.env.SPOTIFY_CLIENT_ID, secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) throw new Error('SPOTIFY_CLIENT_ID of SPOTIFY_CLIENT_SECRET ontbreekt');
  const r = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic ' + Buffer.from(id + ':' + secret).toString('base64') },
    body: 'grant_type=client_credentials'
  });
  if (!r.ok) throw new Error('Spotify-login mislukt (' + r.status + ')');
  return (await r.json()).access_token;
}

async function get(url, t) {
  const r = await fetch(url, { headers: { Authorization: 'Bearer ' + t } });
  if (!r.ok) throw new Error('Spotify gaf ' + r.status + ' op ' + url.replace(API, ''));
  return r.json();
}

const dur = ms => { const s = Math.round(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };

async function releases(key, t) {
  const albums = [];
  let url = `${API}/artists/${ARTISTS[key]}/albums?include_groups=album,single&limit=10`;
  for (let page = 0; url && page < 5; page++) { const d = await get(url, t); albums.push(...d.items); url = d.next; }
  const out = [];
  for (const a of albums) {
    const full = await get(`${API}/albums/${a.id}`, t);
    for (const tr of full.tracks.items) {
      if (!tr.artists.some(x => x.id === ARTISTS[key])) continue;      // alleen nummers waar de artiest zelf op staat
      out.push({ id: tr.id, t: tr.name, a: key, date: full.release_date || '',
        who: tr.artists.map(x => x.name).join(' & ') + ' · ' + (full.release_date || '').slice(0, 4),
        d: dur(tr.duration_ms), url: tr.external_urls && tr.external_urls.spotify });
    }
  }
  return out;
}

module.exports = async (req, res) => {
  try {
    const t = await token();
    const all = [...await releases('jesse', t), ...await releases('claudia', t)];
    const seen = new Set(), tracks = [];
    for (const x of all.sort((p, q) => q.date.localeCompare(p.date))) {   // nieuwste eerst
      const k = (x.t + '|' + x.a).toLowerCase();                           // zelfde nummer op single en album: één keer tonen
      if (seen.has(x.id) || seen.has(k)) continue;
      seen.add(x.id); seen.add(k); tracks.push(x);
    }
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');   // hooguit één keer per uur naar Spotify
    res.status(200).json({ updated: new Date().toISOString(), tracks });
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).json({ error: String(e.message || e) });
  }
};
