export const apiReferenceEnUS = {
  apiReference: {
    defaultTitle: 'API',
    defaultDescription:
      'Public TypeScript API exported by {{packageName}}. Native React and DOM attributes are omitted from the property rows.',
    propertiesRegion: '{{name}} properties',
    columns: {
      property: 'Property',
      type: 'Type',
      default: 'Default',
      description: 'Description',
    },
    required: 'required',
    inheritedFromPrimitives: 'from primitives',
    publicTypes: 'Public types',
  },
} as const;
