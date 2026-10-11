import { Chart } from '@virgo-design/charts';
import { themePresets } from '@virgo-design/themes';
import {
  Button,
  Checkbox,
  Dialog,
  Input,
  Popover,
  Select,
  Surface,
  Table,
  Tooltip,
} from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import { useThemeStyle } from '@/shared/theme/use-theme-style';

import styles from './themes-page.module.scss';

const chartData = [12, 18, 15, 26, 22, 32, 28].map((value, index) => ({
  label: String.fromCharCode(65 + index),
  value,
}));
const tableData = [
  { label: 'A', category: 'one', value: 128 },
  { label: 'B', category: 'two', value: 256 },
  { label: 'C', category: 'one', value: 512 },
] as const;

export function ThemeExperience() {
  const { t } = useTranslation();
  const { theme } = useThemeStyle();
  const preset = themePresets.find((item) => item.id === theme);
  const id = useId();

  return (
    <Surface border="default" radius={16} className={styles.preview} data-theme-experience="">
      <header className={styles.previewHeader}>
        <div>
          <span className={styles.themeName}>{preset?.name ?? theme}</span>
          <h3>{t('themes.specimen.title')}</h3>
          <p>{t('themes.specimen.description')}</p>
        </div>
        <div className={styles.actions}>
          <Tooltip>
            <Tooltip.Trigger
              render={(props) => (
                <Button {...props} variant="outline">
                  {t('themes.specimen.openTooltip')}
                </Button>
              )}
            />
            <Tooltip.Content>{t('themes.specimen.tooltip')}</Tooltip.Content>
          </Tooltip>
          <Popover>
            <Popover.Trigger>{t('themes.specimen.openPopover')}</Popover.Trigger>
            <Popover.Content
              arrow
              placement="bottomRight"
              aria-label={t('themes.specimen.popoverTitle')}
            >
              <div className={styles.popoverExample}>
                <strong>{t('themes.specimen.popoverTitle')}</strong>
                <p>{t('themes.specimen.popoverDescription')}</p>
              </div>
            </Popover.Content>
          </Popover>
          <Dialog>
            <Dialog.Trigger variant="primary">{t('themes.specimen.openDialog')}</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>{t('themes.specimen.dialogTitle')}</Dialog.Title>
                  <Dialog.Description>{t('themes.specimen.dialogDescription')}</Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>
                  <p>{t('themes.specimen.dialogBody')}</p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close variant="primary">{t('themes.specimen.close')}</Dialog.Close>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog>
        </div>
      </header>

      <div className={styles.previewColumns}>
        <Surface border="subtle" radius={12} className={styles.panel}>
          <h4>{t('themes.specimen.chart')}</h4>
          <Chart.Root data={chartData} title={t('themes.specimen.chart')} animated={false}>
            <Chart.Responsive height={220}>
              <Chart.Cartesian>
                <Chart.Grid />
                <Chart.XAxis dataKey="label" />
                <Chart.YAxis />
                <Chart.Line dataKey="value" name={t('themes.specimen.series')} marker="visible" />
                <Chart.Tooltip />
              </Chart.Cartesian>
            </Chart.Responsive>
          </Chart.Root>
        </Surface>
        <Surface border="subtle" radius={12} className={styles.panel}>
          <h4>{t('themes.specimen.controls')}</h4>
          <label className={styles.field} htmlFor={`${id}-input`}>
            <span>{t('themes.specimen.input')}</span>
            <Input id={`${id}-input`} placeholder={t('themes.specimen.placeholder')} />
          </label>
          <div className={styles.field}>
            <span id={`${id}-select`}>{t('themes.specimen.select')}</span>
            <Select defaultValue="one">
              <Select.Trigger aria-labelledby={`${id}-select`} />
              <Select.Content>
                <Select.Option value="one">{t('themes.specimen.options.one')}</Select.Option>
                <Select.Option value="two">{t('themes.specimen.options.two')}</Select.Option>
                <Select.Option value="three">{t('themes.specimen.options.three')}</Select.Option>
              </Select.Content>
            </Select>
          </div>
          <div className={styles.field}>
            <span>{t('themes.specimen.checkbox')}</span>
            <div className={styles.actions}>
              <Checkbox defaultChecked>{t('themes.specimen.options.one')}</Checkbox>
              <Checkbox>{t('themes.specimen.options.two')}</Checkbox>
            </div>
          </div>
          <div className={styles.actions}>
            <Button disabled>{t('themes.specimen.disabled')}</Button>
          </div>
        </Surface>
      </div>

      <div className={styles.materialScene}>
        <div className={styles.sceneContent} aria-hidden="true">
          <span>VIRGO</span>
          <i />
          <i />
        </div>
        <Surface border="subtle" radius={16} elevation={2} className={styles.materialLens}>
          <strong>{t('themes.specimen.materialTitle')}</strong>
          <span>{t('themes.specimen.material')}</span>
        </Surface>
      </div>

      <section className={styles.tableExample} aria-labelledby={`${id}-table`}>
        <h4 id={`${id}-table`}>{t('themes.specimen.table')}</h4>
        <Table.Viewport aria-label={t('themes.specimen.table')}>
          <Table border="rows" hoverable>
            <Table.Header>
              <Table.Row>
                <Table.Head>{t('themes.specimen.name')}</Table.Head>
                <Table.Head>{t('themes.specimen.category')}</Table.Head>
                <Table.Head>{t('themes.specimen.value')}</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableData.map((item, index) => (
                <Table.Row key={item.label} selected={index === 1}>
                  <Table.Cell>{t('themes.specimen.sampleName', { label: item.label })}</Table.Cell>
                  <Table.Cell>{t(`themes.specimen.categories.${item.category}`)}</Table.Cell>
                  <Table.Cell>{item.value}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Viewport>
      </section>
    </Surface>
  );
}
