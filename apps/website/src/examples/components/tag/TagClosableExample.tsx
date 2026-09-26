import { Button, Tag } from '@virgo-design/ui';
import { useState } from 'react';

const initialTags = ['React', 'TypeScript', 'Design tokens'];

export default function App() {
  const [tags, setTags] = useState(initialTags);
  return (
    <div
      style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}
      aria-label="Closable tag collection"
    >
      {tags.map((tag) => (
        <Tag
          key={tag}
          closable
          closeLabel={`Remove ${tag}`}
          onClose={() => setTags((current) => current.filter((value) => value !== tag))}
        >
          {tag}
        </Tag>
      ))}
      <Tag closable disabled>
        Locked
      </Tag>
      <Button variant="text" size="small" onClick={() => setTags(initialTags)}>
        Reset tags
      </Button>
    </div>
  );
}
