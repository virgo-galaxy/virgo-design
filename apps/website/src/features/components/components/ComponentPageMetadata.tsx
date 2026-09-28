import { createContext, type ReactNode, useContext } from 'react';

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
  const metadata = useContext(ComponentPageMetadataContext);

  if (!metadata) {
    throw new Error('ComponentPageMetadata must be rendered inside ComponentPageMetadataProvider.');
  }

  return (
    <div className="eyebrow-row">
      <span>Component {metadata.index}</span>
      <span className="version-badge">
        {metadata.status.toUpperCase()} · {metadata.version}
      </span>
    </div>
  );
}
