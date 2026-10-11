import { Chart } from '@virgo-design/charts';
import { themePresets } from '@virgo-design/themes';
import {
  Button,
  Checkbox,
  Dialog,
  Input,
  PortalProvider,
  Select,
  Surface,
  Table,
  Tooltip,
} from '@virgo-design/ui';
import { useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { Appearance } from '@/shared/theme/types';

import styles from './themes-page.module.scss';

const chartData = [4, 7, 5, 9, 6, 11, 8].map((value, index) => ({ day: String(index + 1), value }));

function ThemeSpecimen({
  theme,
  appearance,
}: {
  theme: (typeof themePresets)[number];
  appearance: Appearance;
}) {
  const { t } = useTranslation();
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={container}
      data-virgo-theme={theme.id}
      data-theme={appearance}
      className={styles.scope}
      data-theme-comparison={theme.id}
    >
      <PortalProvider containerRef={container}>
        <Surface border="default" radius={12} className={styles.specimen}>
          <header className={styles.specimenHeader}>
            <h3>{theme.name}</h3>
            <code>
              {theme.id} / {appearance}
            </code>
            <p>{t(`themeStyleControl.descriptions.${theme.descriptionKey}`)}</p>
          </header>
          <div className={styles.actions}>
            <Button>{t('themes.specimen.primary')}</Button>
            <Button variant="outline">{t('themes.specimen.outline')}</Button>
            <Button disabled>{t('themes.specimen.disabled')}</Button>
          </div>
          <label htmlFor={`${id}-input`}>{t('themes.specimen.input')}</label>
          <Input id={`${id}-input`} placeholder={t('themes.specimen.placeholder')} />
          <Select defaultValue="design">
            <Select.Trigger aria-label={t('themes.specimen.select')} />
            <Select.Content>
              <Select.Option value="design">{t('themes.specimen.design')}</Select.Option>
              <Select.Option value="engineering">{t('themes.specimen.engineering')}</Select.Option>
            </Select.Content>
          </Select>
          <Checkbox defaultChecked>{t('themes.specimen.checkbox')}</Checkbox>
          <Table.Viewport aria-label={`${theme.name} ${t('themes.specimen.table')}`}>
            <Table border="rows" hoverable>
              <Table.Header>
                <Table.Row>
                  <Table.Head>{t('themes.specimen.component')}</Table.Head>
                  <Table.Head>{t('themes.specimen.status')}</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Button</Table.Cell>
                  <Table.Cell>{t('themes.specimen.ready')}</Table.Cell>
                </Table.Row>
                <Table.Row selected>
                  <Table.Cell>Input</Table.Cell>
                  <Table.Cell>{t('themes.specimen.selected')}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Table.Viewport>
          <Chart.Root
            data={chartData}
            title={`${theme.name} ${t('themes.specimen.chart')}`}
            animated={false}
          >
            <Chart.Responsive height={110}>
              <Chart.Cartesian>
                <Chart.Grid />
                <Chart.XAxis dataKey="day" />
                <Chart.YAxis />
                <Chart.Line dataKey="value" name={t('themes.specimen.series')} marker="visible" />
                <Chart.Tooltip />
              </Chart.Cartesian>
            </Chart.Responsive>
          </Chart.Root>
          <div className={styles.materialScene}>
            <div className={styles.sceneContent} aria-hidden="true">
              <span>VIRGO</span>
              <i />
              <i />
            </div>
            <Surface border="subtle" radius={16} elevation={2} className={styles.materialLens}>
              <strong>Surface</strong>
              <span>{t('themes.specimen.material')}</span>
            </Surface>
          </div>
          <div className={styles.actions}>
            <Dialog>
              <Dialog.Trigger>{t('themes.specimen.openDialog')}</Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{theme.name}</Dialog.Title>
                    <Dialog.Description>
                      {t('themes.specimen.dialogDescription')}
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Input
                      aria-label={t('themes.specimen.input')}
                      placeholder={t('themes.specimen.placeholder')}
                    />
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close>{t('themes.specimen.close')}</Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog>
            <Tooltip>
              <Tooltip.Trigger
                render={(props) => (
                  <Button {...props} variant="text">
                    Tooltip
                  </Button>
                )}
              />
              <Tooltip.Content>{t('themes.specimen.tooltip')}</Tooltip.Content>
            </Tooltip>
          </div>
        </Surface>
      </PortalProvider>
    </div>
  );
}

export function ThemeComparison({ appearance }: { appearance: Appearance }) {
  return (
    <div className={styles.comparison}>
      {themePresets.map((theme) => (
        <ThemeSpecimen key={theme.id} theme={theme} appearance={appearance} />
      ))}
    </div>
  );
}
