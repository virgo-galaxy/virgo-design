import { Button, Surface } from '@virgo-design/ui';
import { useState } from 'react';

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
  const [count, setCount] = useState(0);
  return (
    <div style={{ width: '100%', display: 'grid', gap: 16 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: 16,
        }}
      >
        {(['solid', 'translucent', 'glass'] as const).map((material) => (
          <div
            key={material}
            style={{
              padding: 24,
              borderRadius: 16,
              backgroundImage: `url("${landscape}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Surface
              material={material}
              radius={12}
              style={{ padding: 20, display: 'grid', gap: 12 }}
            >
              <strong>{material}</strong>
              <span>Same scene. Different material.</span>
              <Button size="small" variant="outline" onClick={() => setCount((value) => value + 1)}>
                Interact
              </Button>
            </Surface>
          </div>
        ))}
      </div>
      <p role="status" style={{ margin: 0 }}>
        Successful interactions: {count}
      </p>
    </div>
  );
}
