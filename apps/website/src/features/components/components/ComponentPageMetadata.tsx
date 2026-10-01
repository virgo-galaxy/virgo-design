import { Tag } from '@virgo-design/ui';
import { createContext, type ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';

export type ComponentPageMetadataValue = {
  index: string;
  status: 'stable' | 'review';
  version: string;
};

const ComponentPageMetadataContext = createContext<ComponentPageMetadataValue | null>(null);

export function ComponentPageMetadataProvider({
  children,
  metadata,
}: {
  children: ReactNode;
  metadata: ComponentPageMetadataValue;
}) {
  return (
    <ComponentPageMetadataContext.Provider value={metadata}>
      {children}
    </ComponentPageMetadataContext.Provider>
  );
}

export function ComponentPageMetadata() {
  const { t } = useTranslation();
  const metadata = useContext(ComponentPageMetadataContext);

  if (!metadata) {
    throw new Error('ComponentPageMetadata must be rendered inside ComponentPageMetadataProvider.');
  }

  return (
    <div className="eyebrow-row">
      <span>{t('components.catalogue.component', { index: metadata.index })}</span>
      <Tag className="version-badge" size="sm" intent="brand" variant="outline">
        {t(`components.catalogue.status.${metadata.status}`)} · {metadata.version}
      </Tag>
    </div>
  );
}
