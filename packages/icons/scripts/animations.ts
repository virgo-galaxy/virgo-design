import type { IconAnimationDefinition, IconAnimationTrack } from '../src/animation-contract.ts';
import { type IconDefinition, validateIconSvg } from '../src/tooling.ts';

type Point = readonly [number, number];
function polygonPoints(d: string): Point[] {
  const tokens = d.match(/[a-zA-Z]|[-+]?(?:\d*\.\d+|\d+\.?\d*)/g)!;
  const points: Point[] = [];
  let x = 0,
    y = 0;
  for (let i = 0; i < tokens.length;) {
    const command = tokens[i++]!;
    const relative = command === command.toLowerCase();
    switch (command.toUpperCase()) {
      case 'M':
      case 'L': {
        const nextX = Number(tokens[i++]),
          nextY = Number(tokens[i++]);
        x = nextX + (relative ? x : 0);
        y = nextY + (relative ? y : 0);
        break;
      }
      case 'H':
        x = Number(tokens[i++]) + (relative ? x : 0);
        break;
      case 'V':
        y = Number(tokens[i++]) + (relative ? y : 0);
        break;
      case 'Z':
        continue;
      default:
        throw new Error('Chevron animation requires a polygon path.');
    }
    points.push([x, y]);
  }
  return points;
}
const polygonPath = (points: readonly Point[]) =>
  points.map(([x, y], index) => `${index ? 'L' : 'M'}${x} ${y}`).join(' ') + 'Z';
function oppositeChevron(id: string, points: readonly Point[]) {
  const vertical = id.endsWith('up') || id.endsWith('down');
  const flipped = points.map(([x, y]): Point => (vertical ? [x, 24 - y] : [24 - x, y])).reverse();
  // Align corresponding contour vertices while preserving winding and fill throughout the fold.
  const shifts = flipped.map((_, offset) =>
    flipped.map((__, index) => flipped[(index + offset) % flipped.length]!),
  );
  const cost = (pose: readonly Point[]) =>
    pose.reduce(
      (sum, [x, y], index) => sum + (x - points[index]![0]) ** 2 + (y - points[index]![1]) ** 2,
      0,
    );
  return shifts.sort((a, b) => cost(a) - cost(b))[0]!;
}

const transform = (
  path: number,
  kind: 'rotate' | 'translate',
  values: readonly string[],
  times?: readonly number[],
): IconAnimationTrack => ({
  path,
  attribute: 'transform',
  transform: kind,
  values,
  ...(times ? { times } : {}),
});

const scale = (path: number, values: readonly string[]): IconAnimationTrack => ({
  path,
  attribute: 'transform',
  transform: 'scale',
  origin: [12, 12],
  values,
});
const globeMeridian = (width: number) => {
  const x = (value: number) => 12 + value * width;
  return `M12 3C${x(3)} 3 ${x(4.5)} 7 ${x(4.5)} 12S${x(3)} 21 12 21S${x(-4.5)} 17 ${x(-4.5)} 12S${x(-3)} 3 12 3Z M12 5C${x(-1.5)} 5 ${x(-2.75)} 8 ${x(-2.75)} 12S${x(-1.5)} 19 12 19S${x(2.75)} 16 ${x(2.75)} 12S${x(1.5)} 5 12 5Z`;
};
function revealPolygon(
  path: number,
  d: string,
  start: Point,
  times: readonly number[],
): IconAnimationTrack {
  const points = polygonPoints(d);
  const hidden = polygonPath(points.map(() => start));
  return { path, attribute: 'd', reveal: true, values: [hidden, hidden, d, d], times };
}

export function createIconAnimation(
  id: string,
  definition: IconDefinition,
): IconAnimationDefinition | undefined {
  let animation: IconAnimationDefinition | undefined;
  if (/^arrow-(up|down|left|right)$/.test(id)) {
    animation = {
      duration: 1400,
      tracks: [transform(0, 'rotate', ['0 12 12', '-90 12 12', '0 12 12', '0 12 12'])],
    };
  } else if (/^chevron-(up|down|left|right)$/.test(id)) {
    const points = polygonPoints(definition.paths[0]!.d);
    const base = polygonPath(points);
    animation = {
      duration: 1200,
      tracks: [
        {
          path: 0,
          attribute: 'd',
          values: [base, polygonPath(oppositeChevron(id, points)), base, base],
        },
      ],
    };
  } else if (/^chevrons-(up|down|left|right)$/.test(id)) {
    const direction = id.split('-')[1];
    const [x, y] =
      direction === 'up'
        ? [0, -1.8]
        : direction === 'down'
          ? [0, 1.8]
          : direction === 'left'
            ? [-1.8, 0]
            : [1.8, 0];
    animation = {
      duration: 1100,
      tracks: [
        transform(
          0,
          'translate',
          ['0 0', `${x} ${y}`, `${-x / 5} ${-y / 5}`, '0 0', '0 0'],
          [0, 0.3, 0.5, 0.7, 1],
        ),
      ],
    };
  } else if (id === 'code') {
    animation = {
      duration: 1400,
      tracks: [
        transform(0, 'translate', ['0 0', '-1 0', '0 0', '0 0']),
        transform(1, 'translate', ['0 0', '1 0', '0 0', '0 0']),
        { path: 2, attribute: 'opacity', values: ['1', '0', '1', '1'] },
      ],
    };
  } else if (id === 'trash') {
    animation = {
      duration: 1400,
      tracks: [transform(0, 'rotate', ['0 18.5 7.5', '12 18.5 7.5', '0 18.5 7.5', '0 18.5 7.5'])],
    };
  } else if (id === 'copy') {
    animation = {
      duration: 1200,
      tracks: [
        transform(0, 'translate', ['0 0', '-0.7 -0.7', '0 0', '0 0']),
        transform(1, 'translate', ['0 0', '0.7 0.7', '0 0', '0 0']),
      ],
    };
  } else if (id === 'upload' || id === 'download') {
    animation = {
      duration: 1200,
      tracks: [
        transform(0, 'translate', ['0 0', `0 ${id === 'upload' ? -1.5 : 1.5}`, '0 0', '0 0']),
      ],
    };
  } else if (id === 'settings') {
    animation = {
      duration: 1400,
      tracks: [transform(0, 'rotate', ['0 12 12', '30 12 12', '0 12 12', '0 12 12'])],
    };
  } else if (id === 'external-link') {
    const points = polygonPoints(definition.paths[0]!.d);
    const base = polygonPath(points);
    const open = polygonPath(
      points.map(([x, y]): Point => {
        if (y <= 7.5 && x >= 8) return [x, y - (x - 8) * 0.2];
        if (x >= 16.5 && y <= 16) return [x + (16 - y) * 0.2, y];
        return [x, y];
      }),
    );
    animation = {
      duration: 1700,
      tracks: [
        {
          path: 0,
          attribute: 'd',
          values: [base, open, open, base, base],
          times: [0, 0.25, 0.48, 0.8, 1],
        },
        transform(
          1,
          'translate',
          ['0 0', '-0.25 0.25', '1.2 -1.2', '0 0', '0 0'],
          [0, 0.25, 0.48, 0.8, 1],
        ),
      ],
    };
  } else if (id === 'globe') {
    const base = globeMeridian(1);
    animation = {
      duration: 2200,
      tracks: [{ path: 1, attribute: 'd', values: [base, globeMeridian(0.15), base, base] }],
    };
  } else if (id === 'cybertruck') {
    animation = {
      duration: 1300,
      tracks: [
        transform(
          0,
          'translate',
          ['0 0', '0 -0.7', '0 0.25', '0 0', '0 0'],
          [0, 0.3, 0.5, 0.75, 1],
        ),
        transform(1, 'translate', ['0 0', '0 -0.3', '0 0', '0 0']),
        transform(2, 'translate', ['0 0', '0 -0.5', '0 0', '0 0']),
      ],
    };
  } else if (id === 'layers') {
    animation = {
      duration: 1700,
      tracks: [
        transform(0, 'translate', ['0 0', '0 -0.7', '0 2.8', '0 0', '0 0'], [0, 0.25, 0.5, 0.8, 1]),
        transform(2, 'translate', ['0 0', '0 0.7', '0 -2.8', '0 0', '0 0'], [0, 0.25, 0.5, 0.8, 1]),
      ],
    };
  } else if (id === 'lock') {
    animation = {
      duration: 1500,
      tracks: [transform(0, 'rotate', ['0 8 9.5', '-12 8 9.5', '0 8 9.5', '0 8 9.5'])],
    };
  } else if (id === 'search') {
    animation = {
      duration: 1200,
      tracks: [0, 1].map((path) => scale(path, ['1 1', '1.1 1.1', '1 1', '1 1'])),
    };
  } else if (id === 'sun') {
    animation = {
      duration: 1800,
      tracks: [transform(1, 'rotate', ['0 12 12', '45 12 12', '0 12 12', '0 12 12'])],
    };
  } else if (id === 'moon' || id === 'pin') {
    const angle = id === 'moon' ? 12 : 9;
    animation = {
      duration: 1600,
      tracks: [
        transform(
          0,
          'rotate',
          ['0 12 12', `${-angle} 12 12`, `${angle} 12 12`, '0 12 12', '0 12 12'],
          [0, 0.25, 0.5, 0.8, 1],
        ),
      ],
    };
  } else if (id === 'eye') {
    animation = {
      duration: 1800,
      tracks: [0, 1].map((path) => ({
        ...scale(path, ['1 1', '1 0.1', '1 1', '1 1']),
        times: [0, 0.22, 0.44, 1],
      })),
    };
  } else if (id === 'bot') {
    animation = {
      duration: 1500,
      tracks: [
        transform(
          2,
          'rotate',
          ['0 12 6', '-18 12 6', '18 12 6', '0 12 6', '0 12 6'],
          [0, 0.25, 0.5, 0.8, 1],
        ),
      ],
    };
  } else if (id === 'close') {
    animation = {
      duration: 1500,
      tracks: [
        revealPolygon(0, definition.paths[0]!.d, [5.7, 5.7], [0, 0.04, 0.4, 1]),
        revealPolygon(1, definition.paths[1]!.d, [18.3, 5.7], [0, 0.32, 0.7, 1]),
      ],
    };
  } else if (id === 'check') {
    const points = polygonPoints(definition.paths[0]!.d);
    const base = definition.paths[0]!.d;
    const hidden = polygonPath(points.map(() => [5, 11.5] as Point));
    const firstLeg = polygonPath([
      [4.875, 10.75],
      [5.75, 10.75],
      [10, 15],
      [10, 15],
      [10, 15],
      [10.7, 15.7],
      [10.7, 17.3],
      [10.7, 17.3],
      [9.3, 17.3],
      [4.25, 12.25],
      [4.25, 11.375],
    ]);
    animation = {
      duration: 1400,
      tracks: [
        {
          path: 0,
          attribute: 'd',
          reveal: true,
          values: [hidden, firstLeg, base, base],
          times: [0, 0.24, 0.6, 1],
        },
      ],
    };
  } else if (id === 'gauge') {
    animation = {
      duration: 1800,
      tracks: [
        transform(
          3,
          'rotate',
          ['0 12 16', '-65 12 16', '15 12 16', '0 12 16', '0 12 16'],
          [0, 0.25, 0.55, 0.8, 1],
        ),
      ],
    };
  } else if (id === 'shapes') {
    animation = {
      duration: 2600,
      tracks: [
        transform(
          0,
          'translate',
          ['0 0', '5.5 10', '-5.5 10', '0 0', '0 0'],
          [0, 0.28, 0.56, 0.84, 1],
        ),
        transform(
          1,
          'translate',
          ['0 0', '5.5 -10', '11 0', '0 0', '0 0'],
          [0, 0.28, 0.56, 0.84, 1],
        ),
        transform(
          2,
          'translate',
          ['0 0', '-11 0', '-5.5 -10', '0 0', '0 0'],
          [0, 0.28, 0.56, 0.84, 1],
        ),
      ],
    };
  }
  if (animation) validateIconAnimation(animation, definition);
  return animation;
}

export function validateIconAnimation(
  animation: IconAnimationDefinition,
  definition: IconDefinition,
) {
  if (
    !Number.isFinite(animation.duration) ||
    animation.duration < 180 ||
    animation.duration > 10000 ||
    !animation.tracks.length
  )
    throw new Error('Invalid icon animation duration or tracks.');
  const seen = new Set<string>();
  for (const track of animation.tracks) {
    const key = `${track.path}:${track.attribute}`;
    if (
      !Number.isInteger(track.path) ||
      !definition.paths[track.path] ||
      seen.has(key) ||
      track.values.length < 2 ||
      (!track.reveal && track.values[0] !== track.values.at(-1)) ||
      (track.reveal &&
        (track.attribute !== 'd' || track.values.at(-1) !== definition.paths[track.path]?.d)) ||
      (track.origin &&
        (track.transform !== 'scale' ||
          track.origin.some((value) => !Number.isFinite(value) || value < 0 || value > 24)))
    )
      throw new Error('Invalid icon animation path, duplicate track, or terminal pose.');
    seen.add(key);
    const times = track.times ?? [0, 0.35, 0.75, 1];
    if (
      times.length !== track.values.length ||
      times[0] !== 0 ||
      times.at(-1) !== 1 ||
      times.some(
        (time, index) => !Number.isFinite(time) || (index > 0 && time <= times[index - 1]!),
      )
    )
      throw new Error('Invalid icon animation timing.');
    if (track.attribute === 'd') {
      let topology: string | undefined;
      for (const d of track.values) {
        validateIconSvg(`<svg viewBox="0 0 24 24" fill="currentColor"><path d="${d}" /></svg>`);
        const commands = d.replace(/[-+]?(?:\d*\.\d+|\d+\.?\d*)|[\s,]/g, '');
        if (topology && commands !== topology)
          throw new Error('Icon morph poses must share path topology.');
        topology = commands;
      }
    } else {
      const arity =
        track.attribute === 'opacity'
          ? 1
          : track.transform === 'rotate'
            ? 3
            : track.transform === 'translate' || track.transform === 'scale'
              ? 2
              : 0;
      if (!arity || !['opacity', 'transform'].includes(track.attribute))
        throw new Error('Unsupported icon animation attribute.');
      for (const value of track.values) {
        const numbers = value.trim().split(/\s+/).map(Number);
        if (
          numbers.length !== arity ||
          numbers.some((number) => !Number.isFinite(number) || Math.abs(number) > 360) ||
          (track.attribute === 'opacity' && (numbers[0]! < 0 || numbers[0]! > 1)) ||
          (track.transform === 'scale' && numbers.some((number) => number <= 0 || number > 2))
        )
          throw new Error('Invalid icon animation values.');
      }
    }
  }
}
