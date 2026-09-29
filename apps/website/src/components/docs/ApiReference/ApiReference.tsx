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
  title = 'API',
  description,
  className,
}: ApiReferenceProps) {
  const resolvedDescription =
    description ??
    `Public TypeScript API exported by ${document.packageName}. Native React and DOM attributes are omitted from the property rows.`;
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
        <h2 id={`${id}-heading`}>{title}</h2>
        <p>{resolvedDescription}</p>
      </header>

      <div className={styles.declarations}>
        {tableDeclarations.map((declaration) => (
          <section
            className={styles.declaration}
            key={`${declaration.name}-${declaration.source}`}
            aria-labelledby={`${id}-${declaration.name}-heading`}
          >
            <div className={styles.declarationHeader}>
              <div>
                <h3 id={`${id}-${declaration.name}-heading`}>
                  <code>{declaration.name}</code>
                </h3>
                {declaration.description ? <p>{declaration.description}</p> : null}
              </div>
              <span className={styles.kind}>{declaration.kind}</span>
            </div>

            {declaration.signature ? (
              <pre className={styles.signature}>
                <code>
                  {declarationLabel(declaration.kind, declaration.name, declaration.signature)}
                </code>
              </pre>
            ) : null}

            {declaration.properties.length > 0 ? (
              <div
                className={styles.tableViewport}
                role="region"
                aria-label={`${declaration.name} properties`}
                tabIndex={0}
              >
                <table className={styles.table}>
                  <caption className={styles.visuallyHidden}>{declaration.name} properties</caption>
                  <thead>
                    <tr>
                      <th scope="col">Property</th>
                      <th scope="col">Type</th>
                      <th scope="col">Default</th>
                      <th scope="col">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {declaration.properties.map((property) => (
                      <tr key={property.name}>
                        <th scope="row">
                          <code>{property.name}</code>
                          {property.required ? (
                            <span className={styles.required}>required</span>
                          ) : null}
                          {property.source !== document.packageName ? (
                            <small className={styles.inherited}>from primitives</small>
                          ) : null}
                        </th>
                        <td>
                          <code>{property.type}</code>
                        </td>
                        <td>
                          {property.defaultValue ? <code>{property.defaultValue}</code> : '—'}
                        </td>
                        <td>{property.description || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>
        ))}

        {aliasDeclarations.length > 0 ? (
          <section className={styles.aliases} aria-labelledby={`${id}-public-types-heading`}>
            <div className={styles.aliasesHeader}>
              <h3 id={`${id}-public-types-heading`}>Public types</h3>
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
                      <span className={styles.aliasDescription}>{declaration.description}</span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
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
