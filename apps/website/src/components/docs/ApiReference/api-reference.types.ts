export interface ApiReferenceProperty {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string;
  description: string;
  source: string;
}

export interface ApiReferenceDeclaration {
  name: string;
  kind: 'interface' | 'type';
  signature: string;
  description: string;
  source: string;
  reExported: boolean;
  properties: readonly ApiReferenceProperty[];
}

export interface ApiReferenceDocument {
  packageName: string;
  declarations: readonly ApiReferenceDeclaration[];
}

export type ApiReferenceRegistry = Readonly<Record<string, ApiReferenceDocument>>;
