import './platform.scss';

import type { IconProps } from '@virgo-design/icons';
import { ArrowReturnIcon } from '@virgo-design/icons';
import {
  createIconSource,
  type IconDefinition,
  type IconValidationCode,
  IconValidationError,
  serializeIconSvg,
  validateIconSvg,
} from '@virgo-design/icons/tooling';
import { Button, Field, Form, Input, Textarea } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { IconCodePanel } from './IconCodePanel';
import { IconsExplorer } from './IconsExplorer';

const initialSvg =
  '<svg viewBox="0 0 24 24" fill="currentColor">\n  <path d="M4 4h16v16H4z M8 8v8h8V8z" fill-rule="evenodd" />\n</svg>';
function CustomGlyph({
  definition,
  size = 24,
  ...props
}: IconProps & { definition: IconDefinition }) {
  return (
    <svg aria-hidden {...props} viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      {definition.paths.map((path, index) => (
        <path key={index} d={path.d} fillRule={path.fillRule} />
      ))}
    </svg>
  );
}
export function IconStudio() {
  const { t } = useTranslation();
  const [source, setSource] = useState(initialSvg);
  const [name, setName] = useState('custom-square');
  const [result, setResult] = useState<{
    definition: IconDefinition;
    svg: string;
    react: string;
    name: string;
  } | null>(null);
  const [error, setError] = useState<IconValidationCode | null>(null);
  const validate = () => {
    try {
      const definition = validateIconSvg(source);
      const react = createIconSource(name, source);
      setResult({ definition, svg: serializeIconSvg(definition), react, name });
      setError(null);
    } catch (failure) {
      setResult(null);
      setError(failure instanceof IconValidationError ? failure.code : 'structure');
    }
  };
  const invalidate = () => {
    setResult(null);
    setError(null);
  };
  return (
    <section className="icon-platform">
      <Link className="icon-platform-link" to="/foundations/icons">
        <ArrowReturnIcon size={20} />
        {t('icons.back')}
      </Link>
      <h2>{t('icons.studio')}</h2>
      <p>{t('icons.studioDescription')}</p>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          validate();
        }}
      >
        <Field className="icon-platform-field">
          <Field.Label>{t('icons.customName')}</Field.Label>
          <Input
            value={name}
            aria-label={t('icons.customName')}
            onChange={(event) => {
              setName(event.target.value);
              invalidate();
            }}
          />
        </Field>
        <Field className="icon-platform-field" invalid={Boolean(error)}>
          <Field.Label>{t('icons.pasteSvg')}</Field.Label>
          <Textarea
            rows={8}
            value={source}
            onChange={(event) => {
              setSource(event.target.value);
              invalidate();
            }}
          />
          {error ? (
            <Field.Message role="alert">{t(`icons.validation.${error}`)}</Field.Message>
          ) : null}
        </Field>
        <Button type="submit">{t('icons.validate')}</Button>
        <p role="status">{result ? t('icons.valid') : ''}</p>
      </Form>
      {result ? (
        <>
          <h3 className="icon-platform-section-title">{t('icons.previewSection')}</h3>
          <IconsExplorer
            customIcon={{
              id: result.name,
              label: result.name,
              Icon: (props) => <CustomGlyph {...props} definition={result.definition} />,
            }}
          />
          <h3 className="icon-platform-section-title">{t('icons.codeSection')}</h3>
          <IconCodePanel name={result.name} svg={result.svg} reactSource={result.react} />
        </>
      ) : null}
    </section>
  );
}
