import './AvatarPage.scss';

import { Avatar, Badge } from '@virgo-design/ui';

import avatarImage from '@/assets/examples/avatar/icon.png';

import { ReviewSection } from '../../components/ReviewSection';

export function AvatarPage() {
  return (
    <div className="review-board avatar-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 18</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Avatar</h1>
          <p>Identity images with token-based sizing, resilient fallback, and simple grouping.</p>
          <dl className="component-facts">
            <div>
              <dt>Sources</dt>
              <dd>Image</dd>
            </div>
            <div>
              <dt>Fallback</dt>
              <dd>Text</dd>
            </div>
            <div>
              <dt>Composition</dt>
              <dd>Group</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>image · fallback · group</code>
          </div>
          <div className="hero-stage">
            <div className="avatar-stage avatar-hero-stage">
              <Badge dot intent="success" aria-label="Online">
                <Avatar src={avatarImage} alt="Virgo Design" size="lg" />
              </Badge>
              <Avatar fallback="PK" aria-label="Pokeya" size="lg" />
              <Avatar.Group aria-label="Project members">
                <Avatar fallback="VD" />
                <Avatar fallback="UI" />
                <Avatar fallback="DS" />
              </Avatar.Group>
            </div>
          </div>
          <div className="specimen-caption">
            <span>Image</span>
            <span>Fallback</span>
            <span>Presence and group</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="avatar-content"
        index="01"
        title="Image and fallback"
        description="Fallback content appears when the source is absent or cannot load."
      >
        <div className="avatar-stage">
          <Avatar src={avatarImage} alt="Virgo Design" />
          <Avatar fallback="PK" aria-label="Pokeya" />
          <Avatar src="/missing-avatar.png" alt="Broken image example" fallback="BR" />
        </div>
      </ReviewSection>

      <ReviewSection
        id="avatar-sizes"
        index="02"
        title="Sizes and shapes"
        description="Three stable sizes support circular profile and square entity silhouettes."
      >
        <div className="avatar-stage">
          <Avatar size="sm" fallback="S" />
          <Avatar size="md" fallback="M" />
          <Avatar size="lg" fallback="L" />
          <Avatar shape="square" fallback="SQ" />
        </div>
      </ReviewSection>

      <ReviewSection
        id="avatar-composition"
        index="03"
        title="Badge and group composition"
        description="Presence stays a Badge concern; groups remain a lightweight visual collection."
      >
        <div className="avatar-stage">
          <Badge dot intent="success" aria-label="Online">
            <Avatar fallback="PK" />
          </Badge>
          <Avatar.Group aria-label="Project members">
            <Avatar fallback="PK" />
            <Avatar fallback="VD" />
            <Avatar fallback="UI" />
          </Avatar.Group>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Avatar V1.0.0</span>
        <span>Identity · Fallback · Composition</span>
      </footer>
    </div>
  );
}
