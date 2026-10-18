import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { colorPickerExamples } from '@/examples/components/color-picker/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

import styles from './ColorPickerPage.module.scss';

export function ColorPickerPage() {
  const { t } = useTranslation();
  const Reference = colorPickerExamples.example0.Component;

  return (
    <ComponentExampleRuntimeProvider>
      <div className={['component-page', styles.board].join(' ')}>
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>ColorPicker</h1>
            <p>{t('components.colorPicker.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.colorPicker.specimen.referenceSpecimen')}</span>
              <code>ColorPicker</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className={styles.specimen}>
                <Reference />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.colorPicker.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="color-picker-1"
          index="01"
          title={t('examples.colorPicker.copy.title0')}
          description={t('examples.colorPicker.copy.description0')}
        >
          <ComponentExample example={colorPickerExamples.example0} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="color-picker-2"
          index="02"
          title={t('examples.colorPicker.copy.title1')}
          description={t('examples.colorPicker.copy.description1')}
        >
          <ComponentExample example={colorPickerExamples.example1} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="color-picker-3"
          index="03"
          title={t('examples.colorPicker.copy.title2')}
          description={t('examples.colorPicker.copy.description2')}
        >
          <ComponentExample example={colorPickerExamples.example2} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="color-picker-4"
          index="04"
          title={t('examples.colorPicker.copy.title3')}
          description={t('examples.colorPicker.copy.description3')}
        >
          <ComponentExample example={colorPickerExamples.example3} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
