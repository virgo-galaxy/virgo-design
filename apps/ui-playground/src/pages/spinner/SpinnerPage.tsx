import './SpinnerPage.scss';

import { Button, Spinner } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

export function SpinnerPage() {
  return (
    <div className="review-board spinner-review">
      <section className="spinner-intro" id="overview">
        <div className="eyebrow-row">
          <span>Component 30</span>
          <span className="version-badge">STABLE · V1.0.0</span>
        </div>
        <h1>Spinner</h1>
        <p>Indeterminate loading feedback that composes through currentColor.</p>
      </section>

      <ReviewSection
        id="spinner-sizes"
        index="01"
        title="Sizes and intents"
        description="Three token sizes and a small semantic color surface cover inline loading needs."
      >
        <div className="spinner-stage">
          <Spinner size="sm" intent="neutral" />
          <Spinner size="md" intent="brand" />
          <Spinner size="lg" />
        </div>
      </ReviewSection>

      <ReviewSection
        id="spinner-composition"
        index="02"
        title="Inline and Button composition"
        description="Spinner owns no async state and can be composed into existing controls."
      >
        <div className="spinner-stage">
          <span className="spinner-inline">
            <Spinner size="sm" /> Syncing changes
          </span>
          <Button leadingIcon={<Spinner size="sm" />}>Saving</Button>
          <Spinner aria-label="Loading account data" intent="brand" />
        </div>
      </ReviewSection>

      <ReviewSection
        id="spinner-environments"
        index="03"
        title="Light and dark environments"
        description="Current and semantic colors stay theme-aware in both environments."
      >
        <div className="spinner-environments">
          <div className="spinner-environment" data-theme="light">
            <Spinner intent="neutral" aria-label="Loading in light theme" />
          </div>
          <div className="spinner-environment" data-theme="dark">
            <Spinner intent="neutral" aria-label="Loading in dark theme" />
          </div>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Spinner V1.0.0</span>
        <span>Indeterminate · CurrentColor · Reduced motion</span>
      </footer>
    </div>
  );
}
