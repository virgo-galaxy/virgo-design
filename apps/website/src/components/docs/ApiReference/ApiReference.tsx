import { Surface, Table, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateApiDescription } from '@/i18n/translate-api-description';

import styles from './api-reference.module.scss';
import type { ApiReferenceDocument, ApiReferenceRegistry } from './api-reference.types';

interface ApiReferenceProps {
  document: ApiReferenceDocument;
  id?: string;
  title?: string;
  description?: string;
  className?: string | undefined;
}

function declarationLabel(kind: 'interface' | 'type', name: string, signature: string) {
  if (!signature) {
    return `${kind} ${name}`;
  }
  return kind === 'type' ? `type ${name} = ${signature}` : `interface ${name} ${signature}`;
}

export function ApiReference({
  document,
  id = 'api',
  title,
  description,
  className,
}: ApiReferenceProps) {
  const { t } = useTranslation();
  const resolvedTitle = title ?? t('docs.apiReference.defaultTitle');
  const resolvedDescription =
    description ?? t('docs.apiReference.defaultDescription', { packageName: document.packageName });
  const tableDeclarations = document.declarations.filter(
    (declaration) => declaration.properties.length > 0,
  );
  const aliasDeclarations = document.declarations.filter(
    (declaration) => declaration.properties.length === 0,
  );

  return (
    <section
      className={[styles.root, className].filter(Boolean).join(' ')}
      id={id}
      aria-labelledby={`${id}-heading`}
      data-api-reference=""
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>{document.packageName}</p>
        <h2 id={`${id}-heading`}>{resolvedTitle}</h2>
        <p>{resolvedDescription}</p>
      </header>

      <div className={styles.declarations}>
        {tableDeclarations.map((declaration) => (
          <Surface
            className={styles.declaration}
            key={`${declaration.name}-${declaration.source}`}
            tone="default"
            border="subtle"
            radius={12}
            role="region"
            aria-labelledby={`${id}-${declaration.name}-heading`}
          >
            <div className={styles.declarationHeader}>
              <div>
                <h3 id={`${id}-${declaration.name}-heading`}>
                  <code>{declaration.name}</code>
                </h3>
                {declaration.description ? (
                  <p>
                    {translateApiDescription(
                      t,
                      declaration.descriptionTranslationKey,
                      declaration.description,
                    )}
                  </p>
                ) : null}
              </div>
              <Tag size="sm" className={styles.kind}>
                {declaration.kind}
              </Tag>
            </div>

            {declaration.signature ? (
              <pre className={styles.signature}>
                <code>
                  {declarationLabel(declaration.kind, declaration.name, declaration.signature)}
                </code>
              </pre>
            ) : null}

            {declaration.properties.length > 0 ? (
              <Table.Viewport
                className={styles.tableViewport}
                role="region"
                aria-label={t('docs.apiReference.propertiesRegion', { name: declaration.name })}
                tabIndex={0}
              >
                <Table border="separators" density="compact" className={styles.table}>
                  <Table.Caption className={styles.visuallyHidden}>
                    {t('docs.apiReference.propertiesRegion', { name: declaration.name })}
                  </Table.Caption>
                  <Table.Header>
                    <Table.Row>
                      <Table.Head scope="col">{t('docs.apiReference.columns.property')}</Table.Head>
                      <Table.Head scope="col">{t('docs.apiReference.columns.type')}</Table.Head>
                      <Table.Head scope="col">{t('docs.apiReference.columns.default')}</Table.Head>
                      <Table.Head scope="col">
                        {t('docs.apiReference.columns.description')}
                      </Table.Head>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {declaration.properties.map((property) => (
                      <Table.Row key={property.name}>
                        <Table.Head scope="row">
                          <code>{property.name}</code>
                          {property.required ? (
                            <span className={styles.required}>
                              {t('docs.apiReference.required')}
                            </span>
                          ) : null}
                          {property.source !== document.packageName ? (
                            <small className={styles.inherited}>
                              {t('docs.apiReference.inheritedFromPrimitives')}
                            </small>
                          ) : null}
                        </Table.Head>
                        <Table.Cell>
                          <code>{property.type}</code>
                        </Table.Cell>
                        <Table.Cell>
                          {property.defaultValue ? <code>{property.defaultValue}</code> : '—'}
                        </Table.Cell>
                        <Table.Cell>
                          {property.description
                            ? translateApiDescription(
                                t,
                                property.descriptionTranslationKey,
                                property.description,
                              )
                            : '—'}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Table.Viewport>
            ) : null}
          </Surface>
        ))}

        {aliasDeclarations.length > 0 ? (
          <Surface
            className={styles.aliases}
            tone="default"
            border="subtle"
            radius={12}
            role="region"
            aria-labelledby={`${id}-public-types-heading`}
          >
            <div className={styles.aliasesHeader}>
              <h3 id={`${id}-public-types-heading`}>{t('docs.apiReference.publicTypes')}</h3>
              <span>{aliasDeclarations.length}</span>
            </div>
            <dl className={styles.aliasList}>
              {aliasDeclarations.map((declaration) => (
                <div key={`${declaration.name}-${declaration.source}`}>
                  <dt>
                    <code>{declaration.name}</code>
                  </dt>
                  <dd>
                    <code>
                      {declarationLabel(declaration.kind, declaration.name, declaration.signature)}
                    </code>
                    {declaration.description ? (
                      <span className={styles.aliasDescription}>
                        {translateApiDescription(
                          t,
                          declaration.descriptionTranslationKey,
                          declaration.description,
                        )}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </Surface>
        ) : null}
      </div>
    </section>
  );
}

interface RegistryApiReferenceProps extends Omit<ApiReferenceProps, 'document'> {
  registry: ApiReferenceRegistry;
  slug: string;
}

export function RegistryApiReference({ registry, slug, ...props }: RegistryApiReferenceProps) {
  const document = registry[slug];
  if (!document) return null;
  return <ApiReference document={document} {...props} />;
}
