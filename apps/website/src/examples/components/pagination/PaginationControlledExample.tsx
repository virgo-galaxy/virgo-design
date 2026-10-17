import { Pagination, type PaginationProps, Select, Switch } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './PaginationControlledExample.module.scss';

export default function App() {
  const { t } = useTranslation();

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
          {t('examples.pagination.copy.total')}
        </Switch>
        <Switch checked={showSizeChanger} onCheckedChange={setShowSizeChanger}>
          {t('examples.pagination.copy.pageSize')}
        </Switch>
        <Switch checked={showQuickJumper} onCheckedChange={setShowQuickJumper}>
          {t('examples.pagination.copy.quickJump')}
        </Switch>
        <Select
          size="small"
          value={align}
          onValueChange={(value) => {
            if (value === 'left' || value === 'center' || value === 'right') setAlign(value);
          }}
        >
          <Select.Trigger aria-label={t('examples.pagination.copy.paginationAlignment')} />
          <Select.Content>
            <Select.Option value="left">{t('examples.pagination.copy.left')}</Select.Option>
            <Select.Option value="center">{t('examples.pagination.copy.center')}</Select.Option>
            <Select.Option value="right">{t('examples.pagination.copy.right')}</Select.Option>
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
        aria-label={t('examples.pagination.copy.allOptionsPagination')}
      />
      <p role="status" className={styles.text!}>
        {t('examples.pagination.copy.page')} {page} · {pageSize}{' '}
        {t('examples.pagination.copy.itemsPerPage')}
      </p>
    </div>
  );
}
