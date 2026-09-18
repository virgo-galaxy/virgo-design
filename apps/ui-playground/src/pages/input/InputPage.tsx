export function InputPage() {
  return (
    <main className="review-board" id="input-review">
      <section className="overview overview--placeholder" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 02</span>
            <span className="version-badge version-badge--next">Next · V1</span>
          </div>
          <h1>Input</h1>
          <p>
            Text-entry control. The review workspace is reserved now; Primitive, UI, metadata, and
            interaction states will be implemented in the next step.
          </p>

          <dl className="component-facts component-facts--placeholder">
            <div>
              <dt>Primitive</dt>
              <dd>—</dd>
            </div>
            <div>
              <dt>UI</dt>
              <dd>—</dd>
            </div>
            <div>
              <dt>Metadata</dt>
              <dd>—</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen placeholder-specimen">
          <div className="specimen-toolbar">
            <span>Reserved review canvas</span>
            <code>input · next</code>
          </div>
          <div className="hero-stage empty-component-stage">
            <div className="empty-component-state">
              <span className="empty-component-index">02</span>
              <strong>Input review shell</strong>
              <p>No Input implementation is mounted yet.</p>
            </div>
          </div>
          <div className="specimen-caption">
            <span>Primitive pending</span>
            <span>UI pending</span>
            <span>Metadata pending</span>
          </div>
        </div>
      </section>

      <section className="review-section placeholder-review-section">
        <header className="section-header">
          <div className="section-index">01</div>
          <div>
            <h2>Review surface</h2>
            <p>This space will receive Input V1 without changing the Playground shell.</p>
          </div>
        </header>
        <div className="placeholder-review-body">
          <strong>Ready for Input V1</strong>
          <p>
            Sizes, content, icons, states, and real interaction review will be added here in the
            next implementation pass.
          </p>
        </div>
      </section>

      <footer className="review-footer">
        <span>Virgo Design UI · Input V1</span>
        <span>Shell only · implementation next</span>
      </footer>
    </main>
  );
}
