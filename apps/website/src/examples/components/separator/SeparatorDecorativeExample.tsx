import { Separator } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 20, width: '100%', maxWidth: 480 }}>
      <article>
        <h3 style={{ margin: '0 0 6px' }}>Design systems</h3>
        <p style={{ margin: 0 }}>Shared tokens and components keep product surfaces coherent.</p>
      </article>
      <Separator decorative />
      <article>
        <h3 style={{ margin: '0 0 6px' }}>Coverage pass</h3>
        <p style={{ margin: 0 }}>Small stable APIs complete the component map.</p>
      </article>
    </div>
  );
}
