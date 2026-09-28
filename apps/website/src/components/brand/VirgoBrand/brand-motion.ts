import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

// Follow every branch of the blue mark, right to left. The two narrow stems
// require a return pass; the short bridge joins the separate left-hand stroke.
const rollingPath = [
  'M532 217',
  'C483 229 446 275 430 337',
  'C422 367 427 408 411 419',
  'C402 423 408 374 408 342',
  'C408 310 409 278 410 251',
  'C412 205 398 180 374 178',
  'C343 176 318 193 316 243',
  'C315 287 315 328 314 354',
  'C314 373 300 375 300 354',
  'C300 319 306 277 306 248',
  'C306 204 287 178 262 178',
  'C233 178 207 195 207 224',
  'C207 251 222 280 223 298',
  'C224 327 218 370 192 400',
  'C179 415 162 379 150 351',
  'C129 301 108 245 82 190',
].join(' ');

export function createBrandTimeline(root: HTMLAnchorElement) {
  const select = gsap.utils.selector(root);
  const position = select('[data-brand-ball-position]');
  const orb = select('[data-brand-ball-scale]');
  const spin = select('[data-brand-ball-spin]');
  const face = select('[data-brand-face]');
  const glint = select('[data-brand-glint]');
  const mainTrack = root.querySelector<SVGPathElement>('[data-brand-track="main"]');
  const logo = root.querySelector('svg');
  const sheen = select('[data-brand-sheen]');
  const label = root.querySelector<HTMLElement>('[data-brand-label]');
  const letters = select('[data-brand-letter]');
  const letterLayer = select('[data-brand-letters]');
  const dust = select('[data-brand-dust]');
  const name = root.querySelector<HTMLElement>('[data-brand-name]');
  const hasWordmark = name !== null && getComputedStyle(name).display !== 'none';

  gsap.set([orb, spin], { svgOrigin: '0 0' });
  // Preserve the wordmark's real kerning at rest. The temporary glyph layer
  // uses positions measured from that same text and only appears during the tug.
  const labelText = label?.firstChild;
  if (hasWordmark && name && labelText instanceof Text) {
    const wordBox = name.getBoundingClientRect();
    const range = document.createRange();
    letters.forEach((letter: HTMLElement, index: number) => {
      range.setStart(labelText, index);
      range.setEnd(labelText, index + 1);
      gsap.set(letter, {
        left: range.getBoundingClientRect().left - wordBox.left,
        transformOrigin: '50% 80%',
      });
    });
  }

  const originalTrack = mainTrack?.getAttribute('d') ?? '';
  const logoBox = logo?.getBoundingClientRect();
  const nameBox = name?.getBoundingClientRect();
  const pixelsPerUnit = (logoBox?.width ?? 590) / 590;
  const fontSize = name ? Number.parseFloat(getComputedStyle(name).fontSize) : 23;
  // Stay inside the header's existing gap so navigation never gets pushed around.
  const headerGap =
    Number.parseFloat(getComputedStyle(root.closest('header') ?? root).columnGap) || 40;
  const distance = hasWordmark ? Math.min(fontSize * 1.2, Math.max(0, headerGap - 10)) : 0;
  const contactX =
    logoBox && nameBox ? (nameBox.left + fontSize * 0.12 - logoBox.left) / pixelsPerUnit : 720;
  const contactY =
    logoBox && nameBox ? (nameBox.top + nameBox.height * 0.48 - logoBox.top) / pixelsPerUnit : 220;

  // Deform only the right-hand tip. Every control point in the body stays fixed,
  // and matching commands let GSAP interpolate the path without a morph plugin.
  const reach = (wordOffset: number, tension = 0) =>
    originalTrack.replace(
      /(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g,
      (_, rawX: string, rawY: string) => {
        const x = Number(rawX);
        const y = Number(rawY);
        const weight = gsap.utils.clamp(0, 1, (x - 445) / (559 - 445));
        const blend = weight * weight * (3 - 2 * weight);
        return `${(x + (contactX + wordOffset / pixelsPerUnit - 559) * blend).toFixed(2)} ${(y + (contactY - 220 + tension) * blend).toFixed(2)}`;
      },
    );

  const timeline = gsap.timeline({
    paused: true,
    defaults: { ease: 'power2.inOut' },
  });

  timeline
    .addLabel('shine', 0)
    .set(sheen, { autoAlpha: 1, backgroundPosition: '0% 0%' }, 'shine')
    .to(sheen, { backgroundPosition: '100% 100%', duration: hasWordmark ? 1.6 : 0 }, 'shine')
    .to(position, { autoAlpha: 0, duration: 0.1 }, 'shine')
    .set(position, { x: 532, y: 217 }, 'shine+=0.1')
    .set(orb, { scale: 0.26 }, 'shine+=0.1')
    .set(spin, { rotation: 0 }, 'shine')
    .set(face, { autoAlpha: 0 }, 'shine')
    .set(face, { x: 14, y: 0, rotation: 8 }, 'shine')
    .set(glint, { autoAlpha: 0 }, 'shine')
    .set(letterLayer, { autoAlpha: 0 }, 'shine')
    .set(letters, { x: 0, y: 0, rotation: 0, scaleX: 1 }, 'shine')
    .set(dust, { autoAlpha: 0, x: 0, y: 0, scale: 1 }, 'shine')
    .addLabel('roll', hasWordmark ? 1.6 : 0.15)
    .set(sheen, { autoAlpha: 0 }, 'roll')
    .set(glint, { autoAlpha: 0.8 }, 'roll')
    .to(position, { autoAlpha: 1, duration: 0.1 }, 'roll')
    .to(position, { motionPath: { path: rollingPath }, duration: 2.8, ease: 'none' }, 'roll')
    .to(spin, { rotation: -1080, duration: 2.8, ease: 'none' }, 'roll')
    .addLabel('pop')
    .to(
      position,
      {
        motionPath: { path: 'M82 190C60 151 60 63 88.78 64' },
        duration: 0.42,
        ease: 'power2.out',
      },
      'pop',
    )
    .to(orb, { scale: 2.05, duration: 0.42, ease: 'back.out(1.7)' }, 'pop')
    .to(glint, { autoAlpha: 0, duration: 0.15 }, 'pop')
    .to(position, { y: 76, duration: 0.18, ease: 'sine.inOut' }, 'pop+=0.42')
    .to(orb, { scale: 1.9, duration: 0.18, ease: 'sine.inOut' }, 'pop+=0.42')
    .addLabel('expression', 'pop+=0.34')
    .fromTo(
      face,
      { autoAlpha: 0, scaleY: 0.15, x: 14, y: 3, rotation: 8, svgOrigin: '0 0' },
      {
        autoAlpha: 1,
        scaleY: 1,
        y: 0,
        duration: 0.18,
        ease: 'back.out(1.8)',
        immediateRender: false,
      },
      'expression',
    )
    .to(
      face,
      {
        y: -6,
        duration: 0.18,
        repeat: 3,
        yoyo: true,
        ease: 'sine.inOut',
      },
      'expression+=0.2',
    );

  if (hasWordmark && name && mainTrack) {
    timeline
      .set(label, { autoAlpha: 1 }, 'shine')
      .fromTo(
        name,
        { x: 0, rotation: 0, transformOrigin: '0% 55%' },
        { x: distance, duration: 0.8, ease: 'sine.inOut', immediateRender: false },
        'shine',
      )
      .set(mainTrack, { attr: { d: originalTrack } }, 'shine')
      .addLabel('reach', 'expression+=0.1')
      .to(mainTrack, { attr: { d: reach(distance) }, duration: 0.46, ease: 'power2.out' }, 'reach')
      .addLabel('brace', 'reach+=0.5')
      // A little resistance before the pull: the lettering gives, the arm goes taut.
      .to(name, { x: distance + 4, rotation: 0.6, duration: 0.22, ease: 'power2.in' }, 'brace')
      .to(
        mainTrack,
        { attr: { d: reach(distance + 4, -5) }, duration: 0.22, ease: 'power2.in' },
        'brace',
      )
      .to(position, { x: 79, y: 80, duration: 0.22 }, 'brace')
      .to(orb, { rotation: -7, duration: 0.22 }, 'brace')
      .to(face, { scaleY: 0.7, duration: 0.15 }, 'brace')
      .set(label, { autoAlpha: 0 }, 'brace+=0.1')
      .set(letterLayer, { autoAlpha: 1 }, 'brace+=0.1')
      .addLabel('pull', 'brace+=0.22')
      .to(
        letters,
        {
          x: (index: number) => index * 1.25,
          y: (index: number) => [-2, 1.5, -1][index % 3] ?? 0,
          rotation: (index: number) => (index % 2 === 0 ? -8 : 6),
          scaleX: 1.04,
          duration: 0.16,
          stagger: 0.018,
          ease: 'power2.out',
        },
        'pull',
      )
      .to(
        letters,
        {
          x: 0,
          y: 0,
          rotation: 0,
          scaleX: 1,
          duration: 0.38,
          stagger: 0.026,
          ease: 'back.out(1.8)',
        },
        'pull+=0.2',
      )
      .fromTo(
        dust,
        { autoAlpha: 0, scale: 0.3, x: 0, y: 0 },
        { autoAlpha: 0.32, scale: 1, duration: 0.1, stagger: 0.035, immediateRender: false },
        'pull+=0.04',
      )
      .to(dust, { x: 16, y: -4, duration: 0.28, stagger: 0.035, ease: 'power2.out' }, 'pull+=0.04')
      .to(dust, { autoAlpha: 0, y: 3, scale: 1.5, duration: 0.24, stagger: 0.025 }, 'pull+=0.32')
      .to(name, { x: -3, rotation: -0.8, duration: 0.38, ease: 'power3.inOut' }, 'pull')
      .to(mainTrack, { attr: { d: reach(-3) }, duration: 0.38, ease: 'power3.inOut' }, 'pull')
      .to(position, { x: 93, y: 74, duration: 0.38, ease: 'power3.inOut' }, 'pull')
      .to(orb, { rotation: 4, duration: 0.38, ease: 'power3.inOut' }, 'pull')
      .to(face, { scaleY: 1, duration: 0.18 }, 'pull+=0.2')
      .addLabel('release', 'pull+=0.38')
      .to(name, { x: 0, rotation: 0, duration: 0.28, ease: 'back.out(1.6)' }, 'release')
      .to(mainTrack, { attr: { d: reach(0) }, duration: 0.28, ease: 'back.out(1.6)' }, 'release')
      .to(
        mainTrack,
        { attr: { d: originalTrack }, duration: 0.3, ease: 'power2.inOut' },
        'release+=0.28',
      )
      .set(mainTrack, { attr: { d: originalTrack } })
      .set(label, { autoAlpha: 1 }, 'release+=0.56')
      .set(letterLayer, { autoAlpha: 0 }, 'release+=0.56');
  }

  timeline
    .addLabel('settle', hasWordmark ? 'expression+=1.85' : 'expression+=1.02')
    .to(face, { autoAlpha: 0, scaleY: 0.1, duration: 0.16, ease: 'power2.in' }, 'settle+=0.06')
    .to(orb, { scale: 1, rotation: 0, duration: 0.45, ease: 'back.out(1.5)' }, 'settle+=0.12')
    .to(position, { x: 88.78, y: 84.76, duration: 0.45 }, 'settle+=0.12')
    .set(spin, { rotation: 0 });

  return timeline;
}
