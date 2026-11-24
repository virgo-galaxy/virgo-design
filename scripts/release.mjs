import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const registry = 'https://registry.npmjs.org/';
const generator = '@virgo-design/create';

export async function readPackedPlan(directory) {
  const root = path.resolve(directory);
  const plan = JSON.parse(await readFile(path.join(root, 'publish-plan.json'), 'utf8'));
  assert.equal(plan.version, 1, 'Unsupported packed release plan');
  assert(Array.isArray(plan.plan), 'Missing release plan');
  const releases = [];
  const names = new Set();
  for (const release of plan.plan.flat()) {
    assert.equal(release.kind, 'publish', 'Only public npm releases are supported');
    assert.equal(release.access, 'public');
    assert.equal(release.tag, 'latest', 'Use this workflow for stable releases');
    assert(!names.has(release.name), `Duplicate release: ${release.name}`);
    names.add(release.name);
    const archive = path.resolve(root, release.tarball.path);
    assert(archive.startsWith(`${root}${path.sep}`), 'Archive must be inside the packed directory');
    const bytes = await readFile(archive);
    assert.equal(
      `sha256-${createHash('sha256').update(bytes).digest('base64')}`,
      release.tarball.integrity,
      `${release.name}: archive integrity mismatch`,
    );
    releases.push({
      ...release,
      archive,
      integrity: `sha512-${createHash('sha512').update(bytes).digest('base64')}`,
    });
  }
  return releases;
}

async function request(url, fetchImpl) {
  try {
    return await fetchImpl(url, {
      headers: { 'Cache-Control': 'no-cache', Accept: 'application/json' },
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    if (error instanceof TypeError || ['AbortError', 'TimeoutError'].includes(error.name))
      return undefined;
    throw error;
  }
}

function retryable(response) {
  return !response || response.status === 404 || response.status === 429 || response.status >= 500;
}

async function metadata(name, fetchImpl) {
  const response = await request(`${registry}${encodeURIComponent(name)}`, fetchImpl);
  if (retryable(response)) return undefined;
  assert(response.ok, `${name}: registry returned HTTP ${response.status}`);
  return response.json();
}

export async function waitForPublished(
  releases,
  {
    fetchImpl = fetch,
    timeoutMs = 25 * 60_000,
    intervalMs = 10_000,
    sleep = delay,
    now = Date.now,
    log = console.log,
  } = {},
) {
  const deadline = now() + timeoutMs;
  let pending = [...releases];
  let previous;
  while (pending.length) {
    const results = await Promise.all(
      pending.map(async (release) => {
        const info = await metadata(release.name, fetchImpl);
        const version = info?.versions?.[release.version];
        if (!version) return false;
        const integrity = release.integrity ?? version.dist.integrity;
        assert.equal(typeof integrity, 'string', `${release.name}: missing npm integrity`);
        assert.equal(
          version.dist.integrity,
          integrity,
          `${release.name}@${release.version}: npm contains a different archive`,
        );
        if (release.tag && info['dist-tags']?.[release.tag] !== release.version) return false;
        const url = new URL(version.dist.tarball);
        assert.equal(url.origin, registry.slice(0, -1), 'Unexpected npm tarball origin');
        const response = await request(url, fetchImpl);
        if (retryable(response)) return false;
        assert(response.ok, `${release.name}: tarball returned HTTP ${response.status}`);
        const bytes = Buffer.from(await response.arrayBuffer());
        assert.equal(
          `sha512-${createHash('sha512').update(bytes).digest('base64')}`,
          integrity,
          `${release.name}: downloaded archive integrity mismatch`,
        );
        return true;
      }),
    );
    pending = pending.filter((_, index) => !results[index]);
    if (!pending.length) return;
    const message = pending.map(({ name, version }) => `${name}@${version}`).join(', ');
    if (message !== previous) log(`Waiting for npm downloads: ${message}`);
    previous = message;
    assert(
      now() < deadline,
      `npm has not made these versions downloadable: ${message}. Retry this workflow later; do not bump versions to retry an accepted upload.`,
    );
    await sleep(Math.min(intervalMs, deadline - now()));
  }
}

function run(command, args, capture = false) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ['ignore', capture ? 'pipe' : 'inherit', 'inherit'],
      env: { ...process.env, CI: 'true' },
    });
    let output = '';
    if (capture) child.stdout.on('data', (chunk) => (output += chunk));
    child.once('error', reject);
    child.once('exit', (code) =>
      code === 0 ? resolve(output.trim()) : reject(new Error(`${command} exited ${code}`)),
    );
  });
}

export async function publishInPhases(releases, { publish, verify }) {
  for (const phase of [
    releases.filter(({ name }) => name !== generator),
    releases.filter(({ name }) => name === generator),
  ]) {
    if (!phase.length) continue;
    for (const release of phase) await publish(release);
    await verify(phase);
  }
}

async function tagRelease(release, sha) {
  const tag = `${release.name}@${release.version}`;
  const endpoint = `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/git`;
  const headers = {
    Authorization: `Bearer ${process.env.GH_TOKEN}`,
    Accept: 'application/vnd.github+json',
  };
  const existing = await fetch(`${endpoint}/ref/tags/${encodeURIComponent(tag)}`, { headers });
  if (existing.ok) {
    let { object } = await existing.json();
    while (object.type === 'tag') {
      const response = await fetch(
        `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/git/tags/${object.sha}`,
        { headers },
      );
      assert(response.ok, `Could not resolve existing tag ${tag}`);
      ({ object } = await response.json());
    }
    assert.equal(object.sha, sha, `${tag} already points to another commit`);
    return;
  }
  assert.equal(existing.status, 404, `Could not check existing tag ${tag}`);
  const response = await fetch(`${endpoint}/refs`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ref: `refs/tags/${tag}`, sha }),
  });
  assert(response.ok, `Could not create ${tag}: HTTP ${response.status}`);
}

async function main() {
  const { values } = parseArgs({
    options: { 'pack-dir': { type: 'string' }, execute: { type: 'boolean' } },
  });
  assert(values['pack-dir'], 'Provide --pack-dir from changeset pack');
  const releases = await readPackedPlan(values['pack-dir']);
  console.log(
    JSON.stringify(
      releases.map(({ name, version }) => ({ name, version })),
      null,
      2,
    ),
  );
  if (!values.execute || !releases.length) return;
  assert(
    process.env.ACTIONS_ID_TOKEN_REQUEST_URL,
    'Publish from the trusted GitHub Actions workflow',
  );
  assert(process.env.GH_TOKEN && process.env.GITHUB_REPOSITORY, 'Missing GitHub workflow identity');
  await publishInPhases(releases, {
    publish: async (release) => {
      if (release.name === generator) {
        const versions = JSON.parse(
          await readFile(new URL('../cli/config/library-versions.json', import.meta.url), 'utf8'),
        );
        await waitForPublished(
          Object.entries(versions).map(([name, version]) => ({ name, version })),
        );
      }
      const info = await metadata(release.name, fetch);
      if (info?.versions?.[release.version]) {
        assert.equal(
          info.versions[release.version].dist.integrity,
          release.integrity,
          `${release.name}@${release.version}: version already contains another archive`,
        );
        return;
      }
      await run('npm', [
        'publish',
        release.archive,
        '--access',
        release.access,
        '--tag',
        release.tag,
        '--ignore-scripts',
        `--registry=${registry}`,
      ]);
    },
    verify: waitForPublished,
  });
  if (releases.some(({ name }) => name === generator))
    await run('pnpm', ['check:cli', '--template', 'starter-vite-react-tailwind', '--startup']);
  const sha = await run('git', ['rev-parse', 'HEAD'], true);
  for (const release of releases) await tagRelease(release, sha);
  console.log('All planned versions are downloadable and tagged.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await main();
