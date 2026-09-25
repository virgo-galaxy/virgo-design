import './TagPage.scss';

import { CheckIcon, SettingsIcon, WorkspaceIcon } from '@virgo-design/icons';
import { Tag, type TagIntent, type TagSize, type TagVariant } from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const intents = [
  'neutral',
  'brand',
  'success',
  'warning',
  'danger',
  'info',
] as const satisfies readonly TagIntent[];
const variants = ['soft', 'solid', 'outline'] as const satisfies readonly TagVariant[];
const sizes = ['sm', 'md', 'lg'] as const satisfies readonly TagSize[];

export function TagPage() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Design tokens']);

  return (
    <div className="review-board tag-review">
      <section className="tag-intro" id="overview">
        <div className="eyebrow-row">
          <span>Component 28</span>
          <span className="version-badge">STABLE · V1.0.0</span>
        </div>
        <h1>Tag</h1>
        <p>A compact, standalone label for classification, status and short metadata.</p>
      </section>

      <ReviewSection
        id="tag-intents"
        index="01"
        title="Semantic intents"
        description="The palette follows existing Virgo brand and status tokens in light and dark themes."
      >
        <div className="tag-stage">
          {intents.map((intent) => (
            <Tag key={intent} intent={intent}>
              {intent}
            </Tag>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="tag-variants"
        index="02"
        title="Variants and sizes"
        description="Soft, solid and outline treatments share three compact density levels."
      >
        <div className="tag-demo-grid">
          <div className="tag-stage">
            {variants.map((variant) => (
              <Tag key={variant} variant={variant} intent="brand">
                {variant}
              </Tag>
            ))}
          </div>
          <div className="tag-stage">
            {sizes.map((size) => (
              <Tag key={size} size={size}>
                {size.toUpperCase()}
              </Tag>
            ))}
          </div>
        </div>
      </ReviewSection>

      <ReviewSection
        id="tag-composition"
        index="03"
        title="Icons and closable collections"
        description="Icons are decorative. Close buttons notify the owner, and this demo removes the matching item in application state."
      >
        <div className="tag-demo-grid">
          <div className="tag-stage">
            <Tag icon={<WorkspaceIcon />} intent="info">
              Workspace
            </Tag>
            <Tag icon={<CheckIcon />} intent="success" variant="outline">
              Stable
            </Tag>
            <Tag icon={<SettingsIcon />} intent="warning">
              Configuration
            </Tag>
          </div>
          <div className="tag-stage" aria-label="Closable tag collection">
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
          </div>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Tag V1.0.0</span>
        <span>Standalone metadata · Semantic tokens · Classic</span>
      </footer>
    </div>
  );
}
