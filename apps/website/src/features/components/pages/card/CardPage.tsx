import './CardPage.scss';

import { Avatar, Badge, Button, Card, Tag } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

export function CardPage() {
  return (
    <div className="review-board card-review">
      <section className="card-intro" id="overview">
        <div className="eyebrow-row">
          <span>Component 20</span>
          <span className="version-badge">STABLE · V1.0.0</span>
        </div>
        <h1>Card</h1>
        <p>Content structure backed by Surface tokens, without implicit interaction.</p>
      </section>

      <ReviewSection
        id="card-structure"
        index="01"
        title="Basic and header"
        description="Card organizes related content; consumers choose the document heading level."
      >
        <div className="card-grid">
          <Card>
            <Card.Body>A compact group of related project information.</Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title as="h3">Virgo Design</Card.Title>
              <Card.Description>Core UI component coverage and design tokens.</Card.Description>
            </Card.Header>
            <Card.Body>Thirty-four stable component routes are available for review.</Card.Body>
          </Card>
        </div>
      </ReviewSection>

      <ReviewSection
        id="card-actions"
        index="02"
        title="Footer actions"
        description="Actions remain explicit controls composed into the Footer slot."
      >
        <div className="card-grid">
          <Card>
            <Card.Header>
              <Card.Title as="h3">Project access</Card.Title>
              <Card.Description>Invite collaborators to this workspace.</Card.Description>
            </Card.Header>
            <Card.Footer>
              <Button variant="text">Cancel</Button>
              <Button>Invite</Button>
            </Card.Footer>
          </Card>
        </div>
      </ReviewSection>

      <ReviewSection
        id="card-variants"
        index="03"
        title="Outlined and elevated"
        description="Variants map directly to existing Surface border, tone, radius, and elevation tokens."
      >
        <div className="card-grid card-variant-grid">
          <Card variant="outlined" size="sm">
            <Card.Title as="h3">Outlined</Card.Title>
            <Card.Body>Subtle semantic border, small structural spacing.</Card.Body>
          </Card>
          <Card variant="elevated" size="lg">
            <Card.Title as="h3">Elevated</Card.Title>
            <Card.Body>Elevated semantic surface, large structural spacing.</Card.Body>
          </Card>
        </div>
      </ReviewSection>

      <ReviewSection
        id="card-composition"
        index="04"
        title="Avatar, Badge, and arbitrary composition"
        description="Card accepts normal children and does not constrain content to its own anatomy."
      >
        <div className="card-grid">
          <Card variant="outlined">
            <div className="card-profile">
              <Avatar fallback="PK" size="lg" />
              <div>
                <Card.Title as="h3">Pokeya</Card.Title>
                <Card.Description>Design system maintainer</Card.Description>
              </div>
              <Badge count="Online" intent="success" />
            </div>
          </Card>
          <Card>
            <Avatar fallback="VD" />
            <Card.Title as="h3">Virgo Design Core</Card.Title>
            <Tag intent="brand">Coverage Pass</Tag>
            <p className="card-composition-copy">
              Direct children participate in the Card’s normal structural flow.
            </p>
          </Card>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Card V1.0.0</span>
        <span>Content structure · Surface-backed · Non-interactive</span>
      </footer>
    </div>
  );
}
