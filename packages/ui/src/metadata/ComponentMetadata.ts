export interface ComponentMetadataOption {
  readonly name: string;
  readonly description: string;
}

export interface ComponentMetadataExample {
  readonly name: string;
  readonly code: string;
}

export interface ComponentMetadata {
  readonly name: string;
  readonly package: string;
  readonly category: string;
  readonly description: string;
  readonly import: string;
  readonly variants?: readonly ComponentMetadataOption[];
  readonly sizes: readonly ComponentMetadataOption[];
  readonly shapes?: readonly ComponentMetadataOption[];
  readonly states: readonly string[];
  readonly anatomy: readonly ComponentMetadataOption[];
  readonly capabilities: Readonly<Record<string, boolean>>;
  readonly accessibility: readonly string[];
  readonly examples: readonly ComponentMetadataExample[];
}
