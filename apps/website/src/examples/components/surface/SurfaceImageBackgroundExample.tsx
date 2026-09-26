import { Surface } from '@virgo-design/ui';

const landscape = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640" fill="none">
  <defs>
    <linearGradient id="sky" x2="960" y2="640" gradientUnits="userSpaceOnUse">
      <stop stop-color="#172b55"/>
      <stop offset=".52" stop-color="#4556a2"/>
      <stop offset="1" stop-color="#b47985"/>
    </linearGradient>
    <linearGradient id="ridge" x2="800" y2="640" gradientUnits="userSpaceOnUse">
      <stop stop-color="#75bfc2"/>
      <stop offset="1" stop-color="#273d70"/>
    </linearGradient>
  </defs>
  <path fill="url(#sky)" d="M0 0h960v640H0z"/>
  <circle cx="706" cy="182" r="80" fill="#f3d3ab"/>
  <path fill="#9cafd0" d="m0 410 185-251 144 186 112-138 244 296 110-172 165 145v164H0z"/>
  <path fill="url(#ridge)" d="m0 433 211-148 133 154 181-107 156 141 161-99 118 95v171H0z"/>
  <path fill="#152a46" d="m0 543 205-60 184 58 221-90 190 49 160-63v203H0z"/>
  <g stroke="#d3edf0" stroke-opacity=".24">
    <path d="m0 489 211-148 133 154 181-107 156 141 161-99 118 95"/>
    <path d="m0 505 211-148 133 154 181-107 156 141 161-99 118 95"/>
    <path d="m0 521 211-148 133 154 181-107 156 141 161-99 118 95"/>
  </g>
</svg>`)}`;

export default function App() {
  return (
    <Surface
      background={{ type: 'image', src: landscape, fit: 'cover', position: 'center' }}
      radius={12}
      style={{ width: '100%', minHeight: 240, display: 'grid', alignItems: 'end', padding: 24 }}
    >
      <Surface material="glass" tone="elevated" radius={8} style={{ padding: 16 }}>
        <strong>Decorative landscape</strong>
        <p style={{ marginBottom: 0 }}>
          Use an img with alt text when the picture carries meaning.
        </p>
      </Surface>
    </Surface>
  );
}
