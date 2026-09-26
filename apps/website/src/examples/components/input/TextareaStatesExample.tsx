import { Textarea } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 480 }}>
      <Textarea aria-label="Default textarea" placeholder="Describe the project" rows={4} />
      <Textarea
        disabled
        aria-label="Disabled textarea"
        defaultValue="This content is unavailable."
        rows={4}
      />
      <Textarea
        readOnly
        aria-label="Read-only textarea"
        defaultValue="Virgo Design keeps UI assets close to their source of truth."
        rows={4}
      />
      <Textarea invalid aria-label="Invalid textarea" defaultValue="Needs revision" rows={4} />
    </div>
  );
}
