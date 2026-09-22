import './PaginationPage.scss';

import { Pagination, type PaginationProps, Select, Switch } from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

export function PaginationPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [align, setAlign] = useState<NonNullable<PaginationProps['align']>>('left');
  const [showTotal, setShowTotal] = useState(true);
  const [showSizeChanger, setShowSizeChanger] = useState(true);
  const [showQuickJumper, setShowQuickJumper] = useState(true);

  return (
    <div className="review-board pagination-review" id="pagination-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 07</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Pagination</h1>
          <p>
            Move through a collection at your own pace. Clear page positions, focused navigation,
            and optional controls that fit the task.
          </p>
          <dl className="component-facts">
            <div>
              <dt>Alignment</dt>
              <dd>3 positions</dd>
            </div>
            <div>
              <dt>Options</dt>
              <dd>3 controls</dd>
            </div>
            <div>
              <dt>State</dt>
              <dd>Both modes</dd>
            </div>
          </dl>
        </div>
        <div className="hero-specimen pagination-hero">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>page navigation</code>
          </div>
          <div className="hero-stage pagination-hero-stage">
            <Pagination
              total={500}
              defaultPage={6}
              align="center"
              aria-label="Reference pagination"
            />
          </div>
          <div className="specimen-caption">
            <span>Current page</span>
            <span>Bounded pages</span>
            <span>Quick navigation</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="pagination-basic"
        index="01"
        title="Basic"
        description="Five pages, native buttons, and disabled navigation at the first and last page."
      >
        <div className="pagination-review-card">
          <Pagination total={50} aria-label="Basic pagination" />
        </div>
      </ReviewSection>
      <ReviewSection
        id="pagination-more"
        index="02"
        title="More pages"
        description="The first and last pages stay visible. Hover or focus an ellipsis to reveal the five-page jump action."
      >
        <div className="pagination-review-card">
          <Pagination total={500} defaultPage={6} aria-label="Long pagination" />
        </div>
      </ReviewSection>
      <ReviewSection
        id="pagination-size"
        index="03"
        title="Page size"
        description="Show the size menu independently. Virgo Dropdown marks the current size and supports keyboard navigation; changing size returns to page one."
      >
        <div className="pagination-review-card">
          <Pagination
            total={500}
            defaultPage={3}
            showSizeChanger
            aria-label="Page size pagination"
          />
        </div>
      </ReviewSection>
      <ReviewSection
        id="pagination-jump"
        index="04"
        title="Quick jump"
        description="Enter a page number and press Enter. Out-of-range or nonnumeric input is marked invalid; Escape clears the draft."
      >
        <div className="pagination-review-card">
          <Pagination total={500} showQuickJumper aria-label="Quick jump pagination" />
        </div>
      </ReviewSection>
      <ReviewSection
        id="pagination-total"
        index="05"
        title="Total & range"
        description="Display the count by itself, or render the visible item range with the total callback."
      >
        <div className="pagination-review-card">
          <Pagination total={85} showTotal aria-label="Total pagination" />
          <Pagination
            total={85}
            defaultPageSize={20}
            showTotal={(total, [start, end]) => `${start}–${end} of ${total} items`}
            aria-label="Range pagination"
          />
        </div>
      </ReviewSection>
      <ReviewSection
        id="pagination-all"
        index="06"
        title="All options"
        description="showAll enables total, page size and jump together. Each can be overridden independently; this example owns both page and page size."
      >
        <div className="pagination-review-card">
          <div className="pagination-demo-controls">
            <Switch checked={showTotal} onCheckedChange={setShowTotal}>
              Total
            </Switch>
            <Switch checked={showSizeChanger} onCheckedChange={setShowSizeChanger}>
              Page size
            </Switch>
            <Switch checked={showQuickJumper} onCheckedChange={setShowQuickJumper}>
              Quick jump
            </Switch>
            <Select
              size="small"
              value={align}
              onValueChange={(value) => setAlign(value as NonNullable<PaginationProps['align']>)}
            >
              <Select.Trigger aria-label="Pagination alignment" />
              <Select.Content>
                <Select.Option value="left">Left</Select.Option>
                <Select.Option value="center">Center</Select.Option>
                <Select.Option value="right">Right</Select.Option>
              </Select.Content>
            </Select>
          </div>
          <Pagination
            total={85}
            page={page}
            pageSize={pageSize}
            onChange={(nextPage, nextSize) => {
              setPage(nextPage);
              setPageSize(nextSize);
            }}
            showAll
            showTotal={showTotal}
            showSizeChanger={showSizeChanger}
            showQuickJumper={showQuickJumper}
            align={align}
            aria-label="All options pagination"
          />
          <p className="pagination-demo-status" role="status">
            Page {page} · {pageSize} items per page
          </p>
          <pre>
            <code>{'<Pagination total={85} showAll />'}</code>
          </pre>
        </div>
      </ReviewSection>
      <ReviewSection
        id="pagination-align"
        index="07"
        title="Alignment"
        description="Align the whole pagination group to the left, center or right of its container."
      >
        <div className="pagination-review-card">
          {(['left', 'center', 'right'] as const).map((alignment) => (
            <Pagination
              key={alignment}
              total={50}
              align={alignment}
              aria-label={`${alignment} pagination`}
            />
          ))}
        </div>
      </ReviewSection>
      <ReviewSection
        id="pagination-labels"
        index="08"
        title="Navigation labels"
        description="Replace arrow icons with text, or localize the controls and their accessible names."
      >
        <div className="pagination-review-card">
          <Pagination
            total={500}
            previousLabel="Previous"
            nextLabel="Next"
            aria-label="Text navigation pagination"
          />
          <Pagination
            total={85}
            showAll
            previousLabel="上一页"
            nextLabel="下一页"
            labels={{
              navigation: '分页',
              previous: '上一页',
              next: '下一页',
              page: (value) => `第 ${value} 页`,
              jumpBackward: '向前跳 5 页',
              jumpForward: '向后跳 5 页',
              pageSize: '每页条数',
              itemsPerPage: (size) => `${size} 条/页`,
              jumpTo: '跳至',
              pageUnit: '页',
              total: (total) => `共 ${total} 条`,
            }}
          />
        </div>
      </ReviewSection>
      <ReviewSection
        id="pagination-states"
        index="09"
        title="Disabled & empty"
        description="All controls honor the disabled state. Empty collections keep a stable page-one layout with a zero item range."
      >
        <div className="pagination-review-card">
          <Pagination
            total={85}
            defaultPage={3}
            showAll
            disabled
            aria-label="Disabled pagination"
          />
          <Pagination
            total={0}
            showAll
            showTotal={(total, [start, end]) => `${start}–${end} of ${total} items`}
            aria-label="Empty pagination"
          />
        </div>
      </ReviewSection>
      <footer className="review-footer">
        <span>Virgo Design UI · Pagination V1.0.0</span>
        <span>Primitive · Tokens · Icons · Metadata · Accessibility</span>
      </footer>
    </div>
  );
}
