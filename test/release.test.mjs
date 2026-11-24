// @vitest-environment node
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import { beforeAll, describe, expect, it, vi } from 'vitest';

import { publishInPhases, waitForPublished } from '../scripts/release.mjs';

describe('independent package releases', () => {
  let packages;
  let config;
  let assembleReleasePlan;
  beforeAll(async () => {
    const require = createRequire(import.meta.url);
    const changesets = createRequire(require.resolve('@changesets/cli/package.json'));
    const { getPackages } = changesets('@manypkg/get-packages');
    const { readConfig } = changesets('@changesets/config');
    ({ assembleReleasePlan } = changesets('@changesets/assemble-release-plan'));
    const root = fileURLToPath(new URL('../', import.meta.url));
    packages = await getPackages(root);
    const result = await readConfig(root, packages);
    expect(result.errors).toBeUndefined();
    config = result.config;
  });

  function plan(name, type = 'patch', workspace = packages) {
    return assembleReleasePlan(
      [{ id: 'independent-release', summary: 'Package change', releases: [{ name, type }] }],
      workspace,
      config,
    ).releases.filter((release) => release.type !== 'none');
  }

  it.each(['ui', 'icons', 'colors', 'tokens', 'create'])(
    'can release %s without bumping unrelated packages',
    (name) => {
      const releases = plan(`@virgo-design/${name}`);
      expect(releases.map((release) => release.name)).toEqual([`@virgo-design/${name}`]);
    },
  );

  it('includes UI when an icon update leaves its supported range', () => {
    const releases = plan('@virgo-design/icons', 'minor');
    expect(releases.map((release) => release.name).sort()).toEqual([
      '@virgo-design/icons',
      '@virgo-design/ui',
    ]);
  });

  it('keeps different package versions independent', () => {
    const workspace = { ...packages, packages: structuredClone(packages.packages) };
    workspace.packages.find(
      (pkg) => pkg.packageJson.name === '@virgo-design/ui',
    ).packageJson.version = '0.1.5';
    const releases = plan('@virgo-design/ui', 'patch', workspace);
    expect(releases).toHaveLength(1);
    expect(releases[0].newVersion).toBe('0.1.6');
  });

  it('allows another public package without changing the existing release group', () => {
    const workspace = {
      ...packages,
      packages: [
        ...packages.packages,
        {
          dir: `${packages.rootDir}/packages/release-fixture`,
          relativeDir: 'packages/release-fixture',
          packageJson: { name: '@virgo-design/release-fixture', version: '0.1.0' },
        },
      ],
    };
    expect(
      plan('@virgo-design/release-fixture', 'patch', workspace).map((release) => release.name),
    ).toEqual(['@virgo-design/release-fixture']);
  });
});

const bytes = Buffer.from('packed library');
const release = {
  name: '@virgo-design/ui',
  version: '0.1.2',
  tag: 'latest',
  integrity: `sha512-${createHash('sha512').update(bytes).digest('base64')}`,
};
const info = {
  'dist-tags': { latest: release.version },
  versions: {
    [release.version]: {
      dist: {
        integrity: release.integrity,
        tarball: 'https://registry.npmjs.org/@virgo-design/ui/-/ui-0.1.2.tgz',
      },
    },
  },
};

describe('npm release verification', () => {
  it('waits when a version is listed but its archive is not downloadable yet', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(Response.json(info))
      .mockResolvedValueOnce(new Response(null, { status: 404 }))
      .mockResolvedValueOnce(Response.json(info))
      .mockResolvedValueOnce(new Response(bytes));
    const sleep = vi.fn().mockResolvedValue(undefined);
    await waitForPublished([release], { fetchImpl, sleep, log: vi.fn() });
    expect(sleep).toHaveBeenCalledOnce();
    expect(fetchImpl).toHaveBeenCalledTimes(4);
  });

  it('rejects an existing version that contains different bytes', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(Response.json(info))
      .mockResolvedValueOnce(new Response('different archive'));
    await expect(waitForPublished([release], { fetchImpl })).rejects.toThrow(
      'downloaded archive integrity mismatch',
    );
  });

  it('accepts an exact template dependency even when latest has advanced', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(Response.json({ ...info, 'dist-tags': { latest: '0.1.3' } }))
      .mockResolvedValueOnce(new Response(bytes));
    await waitForPublished([{ name: release.name, version: release.version }], { fetchImpl });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it('fails with a retry instruction when npm visibility times out', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 404 }));
    await expect(
      waitForPublished([release], { fetchImpl, timeoutMs: 0, log: vi.fn() }),
    ).rejects.toThrow('do not bump versions to retry an accepted upload');
  });

  it('publishes the generator only after library downloads pass verification', async () => {
    const calls = [];
    const cli = { name: '@virgo-design/create', version: '0.1.2' };
    await publishInPhases([cli, release], {
      publish: async (pkg) => calls.push(`publish ${pkg.name}`),
      verify: async (pkgs) => calls.push(`verify ${pkgs.map((pkg) => pkg.name).join(',')}`),
    });
    expect(calls).toEqual([
      'publish @virgo-design/ui',
      'verify @virgo-design/ui',
      'publish @virgo-design/create',
      'verify @virgo-design/create',
    ]);
  });

  it('stops before publishing the generator when a library cannot be downloaded', async () => {
    const publish = vi.fn();
    await expect(
      publishInPhases([release, { name: '@virgo-design/create' }], {
        publish,
        verify: async () => {
          throw new Error('library unavailable');
        },
      }),
    ).rejects.toThrow('library unavailable');
    expect(publish).toHaveBeenCalledExactlyOnceWith(release);
  });
});
