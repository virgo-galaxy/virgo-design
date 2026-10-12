import { Field, Form, Input, Select } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { formExamples } from '@/examples/components/form/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './FormPage.module.scss';
export function FormPage() {
  const { t } = useTranslation();
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['component-page', styles.board].join(' ')}>
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Form</h1>
            <p>{t('components.form.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.form.specimen.referenceSpecimen')}</span>
              <code>Form</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className={styles.specimen}>
                <Form onSubmit={(event) => event.preventDefault()}>
                  <Field required>
                    <Field.Label>{t('examples.form.copy.email')}</Field.Label>
                    <Input type="email" placeholder="example@example.test" />
                  </Field>
                  <Field>
                    <Field.Label>{t('examples.form.copy.project')}</Field.Label>
                    <Select>
                      <Select.Trigger placeholder={t('examples.form.copy.choose')} />
                      <Select.Content>
                        <Select.Option value="design">Item A</Select.Option>
                        <Select.Option value="pro">Item B</Select.Option>
                      </Select.Content>
                    </Select>
                  </Field>
                </Form>
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.form.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="form-1"
          index="01"
          title={t('examples.form.copy.title0')}
          description={t('examples.form.copy.description0')}
        >
          <ComponentExample example={formExamples.example0} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="form-2"
          index="02"
          title={t('examples.form.copy.title1')}
          description={t('examples.form.copy.description1')}
        >
          <ComponentExample example={formExamples.example1} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="form-3"
          index="03"
          title={t('examples.form.copy.title2')}
          description={t('examples.form.copy.description2')}
        >
          <ComponentExample example={formExamples.example2} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
