import './SeparatorPage.scss';

import { Separator } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

export function SeparatorPage() {
  return (
    <div className="review-board separator-review">
      <section className="separator-intro" id="overview">
        <div className="eyebrow-row">
          <span>Component 33</span>
          <span className="version-badge">STABLE · V1.0.0</span>
        </div>
        <h1>Separator</h1>
        <p>A token-based rule for visual and semantic separation in general layouts.</p>
      </section>

      <ReviewSection
        id="separator-horizontal"
        index="01"
        title="Horizontal"
        description="The default orientation separates stacked content with explicit semantics."
      >
        <div className="separator-stack">
          <span>Account details</span>
          <Separator />
          <span>Notification preferences</span>
          <Separator />
          <span>Security settings</span>
        </div>
      </ReviewSection>

      <ReviewSection
        id="separator-vertical"
        index="02"
        title="Vertical"
        description="Vertical separators stretch naturally between adjacent inline items."
      >
        <div className="separator-row">
          <span>Overview</span>
          <Separator orientation="vertical" />
          <span>Activity</span>
          <Separator orientation="vertical" />
          <span>Settings</span>
        </div>
      </ReviewSection>

      <ReviewSection
        id="separator-decorative"
        index="03"
        title="Decorative between content blocks"
        description="Decorative rules remain visual-only when existing structure already conveys separation."
      >
        <div className="separator-blocks">
          <article>
            <h3>Design systems</h3>
            <p>Shared tokens and components keep product surfaces coherent.</p>
          </article>
          <Separator decorative />
          <article>
            <h3>Coverage pass</h3>
            <p>Small stable APIs complete the component map before deeper iteration.</p>
          </article>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Separator V1.0.0</span>
        <span>Horizontal · Vertical · Decorative</span>
      </footer>
    </div>
  );
}
