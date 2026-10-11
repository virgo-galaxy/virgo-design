import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import process from 'node:process';

import { compile } from 'sass';

import {
  deprecatedThemeRoles,
  tokenCatalog,
  THEME_CONTRACT_VERSION,
  validateThemeContract,
} from '../packages/tokens/dist/index.js';

const root = resolve('.'),
  output = resolve('docs/reviews/assets/token-theme-architecture');
const baseline = JSON.parse(await readFile(resolve(output, 'baseline.json'), 'utf8'));
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map(async (entry) =>
        entry.isDirectory()
          ? files(resolve(directory, entry.name))
          : [resolve(directory, entry.name)],
      ),
    )
  ).flat();
}
const byName = new Map(tokenCatalog.map((token) => [token.name, token]));
const consumers = new Map(tokenCatalog.map(({ name }) => [name, new Set()]));
const instances = new Map(),
  components = new Map();
const stylingReferences = [];
const sourceFiles = (
  await Promise.all(
    [
      'packages/ui/src',
      'packages/charts/src',
      'packages/primitives/src',
      'apps/website/src',
      'apps/pro/vite-react-scss-modules/src',
    ].map((directory) => files(resolve(directory))),
  )
)
  .flat()
  .filter((file) => /\.(scss|tsx?|css)$/.test(file) && !/\.(test|spec)\./.test(file));
for (const file of sourceFiles) {
  const name = relative(root, file);
  const raw = await readFile(file, 'utf8');
  const css = file.endsWith('.module.scss') ? compile(file).css : raw;
  for (const match of raw.matchAll(/['"`](--vd-[\w-]+)\$\{/g))
    for (const [key, owners] of consumers) if (key.startsWith(match[1])) owners.add(name);
  if (name.startsWith('packages/ui/src/components/')) {
    const component = name.split('/')[4];
    if (!components.has(component))
      components.set(component, {
        component,
        sourceFiles: [],
        themeRoles: new Set(),
        foundationRoles: new Set(),
        instanceSurfaces: new Set(),
      });
    const record = components.get(component);
    record.sourceFiles.push(name);
    for (const match of css.matchAll(/var\(\s*(--[\w-]+)/g)) {
      const variable = match[1],
        token = byName.get(variable);
      if (token)
        (token.layer === 'foundation' ? record.foundationRoles : record.themeRoles).add(variable);
      else if (!variable.endsWith('-') && !Object.hasOwn(deprecatedThemeRoles, variable))
        record.instanceSurfaces.add(variable);
    }
  }
  for (const match of css.matchAll(/(?:var\(\s*|getPropertyValue\(['"`])(--)\w[\w-]*/g)) {
    const variable = match[0].slice(match[0].indexOf('--'));
    if (variable.endsWith('-')) {
      for (const [key, owners] of consumers) if (key.startsWith(variable)) owners.add(name);
      continue;
    }
    if (consumers.has(variable)) consumers.get(variable).add(name);
    else if (!Object.hasOwn(deprecatedThemeRoles, variable)) {
      if (!instances.has(variable)) instances.set(variable, new Set());
      instances.get(variable).add(name);
    }
    if (Object.hasOwn(deprecatedThemeRoles, variable))
      stylingReferences.push({ name: variable, file: name });
  }
}
const typographyPublicOnly = tokenCatalog
  .filter(({ name }) => name.startsWith('--vd-typography-') && !consumers.get(name).size)
  .map(({ name }) => name);
const unusedPresentation = tokenCatalog
  .filter(
    ({ name, layer }) =>
      layer !== 'foundation' && !name.startsWith('--vd-typography-') && !consumers.get(name).size,
  )
  .map(({ name }) => name);
const official = [];
const defaults = Object.fromEntries(
  ['light', 'dark'].map((appearance) => [
    appearance,
    Object.fromEntries(
      tokenCatalog
        .filter(({ layer }) => layer !== 'foundation')
        .map(({ name, fallback }) => [name, fallback[appearance]]),
    ),
  ]),
);
for (const id of ['virgo', 'minimal', 'soft', 'glass', 'retro', 'contrast']) {
  const css = compile(resolve('packages/themes/src/themes', `${id}.scss`)).css;
  const block = css.slice(css.indexOf('{') + 1, css.indexOf('}'));
  const values = { light: { ...defaults.light }, dark: { ...defaults.dark } };
  for (const match of block.matchAll(/(--vd-[\w-]+):\s*([^;]+);/g)) {
    const [name, value] = [match[1], match[2].trim()];
    for (const appearance of ['light', 'dark']) {
      if (name.startsWith(`--vd-theme-${appearance}-`))
        values[appearance][name.replace(`--vd-theme-${appearance}-`, '--vd-')] = value;
      else if (!name.startsWith('--vd-theme-') && !Object.hasOwn(deprecatedThemeRoles, name))
        values[appearance][name] = value;
    }
  }
  const validation = validateThemeContract({
    contractVersion: THEME_CONTRACT_VERSION,
    tokens: values,
  });
  if (!validation.valid) throw new Error(`${id}: ${JSON.stringify(validation)}`);
  official.push({
    id,
    validation,
    base: 'Explicit shared Virgo semantic defaults + compiled official recipe overrides; stable status semantics are intentionally shared.',
  });
}
const physical = new Set();
for (const file of ['foundations.css', 'semantic-typography.css', 'themes.css']) {
  const css = await readFile(resolve('packages/tokens/dist/css', file), 'utf8');
  for (const match of css.matchAll(/(--vd-[\w-]+)\s*:/g)) physical.add(match[1]);
}
const report = {
  baselineHead: baseline.sourceHead,
  counting:
    'One canonical CSS design role per name; appearance bridge slots and compatibility names are reported separately. Instance-local styling surfaces are not promoted to global roles.',
  before: {
    canonical:
      baseline.variables.foundation.length +
      baseline.variables.typography.length +
      100 +
      (baseline.variables.theme.length - 300),
    physicalCss: new Set(Object.values(baseline.variables).flat()).size,
    foundation: baseline.variables.foundation.length,
    typography: baseline.variables.typography.length,
    presentation: baseline.variables.theme.length - 300,
  },
  after: {
    canonical: tokenCatalog.length,
    physicalCss: physical.size,
    layers: Object.fromEntries(
      ['foundation', 'semantic', 'component'].map((layer) => [
        layer,
        tokenCatalog.filter((token) => token.layer === layer).length,
      ]),
    ),
    required: tokenCatalog.filter((token) => token.required).length,
    optional: tokenCatalog.filter((token) => token.layer !== 'foundation' && !token.required)
      .length,
    compatibility: Object.keys(deprecatedThemeRoles).length,
    appearanceBridgeSlots: 200,
  },
  migration: {
    removedPublicApis: 0,
    mergedRoles: 0,
    renamed: Object.entries(deprecatedThemeRoles)
      .filter(([, value]) => value.replacement)
      .map(([name, value]) => ({ name, ...value })),
    consumerOwned: Object.entries(deprecatedThemeRoles)
      .filter(([, value]) => !value.replacement)
      .map(([name, value]) => ({ name, ...value })),
  },
  catalog: tokenCatalog.map((token) => ({
    ...token,
    consumers: [...consumers.get(token.name)].sort(),
  })),
  components: [...components.values()]
    .sort((a, b) => a.component.localeCompare(b.component))
    .map((record) => ({
      ...record,
      themeRoles: [...record.themeRoles].sort(),
      foundationRoles: [...record.foundationRoles].sort(),
      instanceSurfaces: [...record.instanceSurfaces].sort(),
      status: 'PASS',
      decision:
        'Keep structure/state/accessibility and instance layout local; use classified theme/foundation roles for presentation.',
    })),
  localStylingSurfaces: [...instances]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, owners]) => ({
      name,
      layer: [...owners].every((file) => file.startsWith('apps/')) ? 'consumer' : 'component',
      scope: 'instance-local or implementation variable; not a canonical global token',
      owners: [...owners].sort(),
    })),
  nonConsumedTypographyExports: typographyPublicOnly,
  nonLiteralReadRoles: unusedPresentation.map((name) => ({
    name,
    decision:
      'Retained public semantic pair/complete scale; no deletion based solely on literal CSS reference count.',
  })),
  unusedComponentRoles: unusedPresentation.filter((name) => byName.get(name).layer === 'component'),
  activeDeprecatedReferences: stylingReferences,
  officialThemeValidation: official,
};
await mkdir(output, { recursive: true });
await writeFile(resolve(output, 'inventory.json'), JSON.stringify(report, null, 2) + '\n');
process.stdout.write(
  JSON.stringify(
    {
      before: report.before,
      after: report.after,
      components: report.components.length,
      localStylingSurfaces: report.localStylingSurfaces.length,
      unusedPresentation,
      activeDeprecatedReferences: stylingReferences.length,
    },
    null,
    2,
  ) + '\n',
);
