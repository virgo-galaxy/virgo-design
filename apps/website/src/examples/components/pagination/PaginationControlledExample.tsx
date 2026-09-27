import { Pagination, type PaginationProps, Select, Switch } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './PaginationControlledExample.module.scss';

export default function App() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [align, setAlign] = useState<NonNullable<PaginationProps['align']>>('left');
  const [showTotal, setShowTotal] = useState(true);
  const [showSizeChanger, setShowSizeChanger] = useState(true);
  const [showQuickJumper, setShowQuickJumper] = useState(true);
  return (
    <div className={styles.root!}>
      <div className={styles.stage!}>
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
          onValueChange={(value) => {
            if (value === 'left' || value === 'center' || value === 'right') setAlign(value);
          }}
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
      <p role="status" className={styles.text!}>
        Page {page} · {pageSize} items per page
      </p>
    </div>
  );
}
