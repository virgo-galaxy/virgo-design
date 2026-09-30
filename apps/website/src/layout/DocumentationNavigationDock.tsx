import {
  LayersIcon,
  LayoutIcon,
  PaletteIcon,
  ShapesIcon,
  SplineIcon,
  TypeIcon,
} from '@virgo-design/icons';
import { Dock, type DockPlacement } from '@virgo-design/ui';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { SectionNavigation } from '@/components/section/SectionNavigation';
import { useAppLocale } from '@/i18n';
import { FOUNDATION_NAVIGATION_ITEMS, TOKEN_NAVIGATION_ITEMS } from '@/shared/routes/route-config';

import styles from './documentation-navigation-dock.module.scss';

const STORAGE_KEY = 'virgo-design:documentation-navigation';
const EDGES = ['top', 'left', 'right'] as const;
const ICONS = {
  'foundations.navigation.colors': PaletteIcon,
  'foundations.navigation.typography': TypeIcon,
  'foundations.navigation.layout': LayoutIcon,
  'foundations.navigation.shapeDepth': LayersIcon,
  'foundations.navigation.motion': SplineIcon,
  'foundations.navigation.icons': ShapesIcon,
  'tokens.navigation.colors': PaletteIcon,
  'tokens.navigation.typography': TypeIcon,
} as const;

function readPosition(): { placement: DockPlacement; offset: number | null } {
  const fallback = { placement: { edge: 'top', position: 0.5 } as DockPlacement, offset: null };
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') as {
      edge?: unknown;
      offset?: unknown;
      position?: unknown;
    } | null;
    if (
      stored &&
      EDGES.includes(stored.edge as (typeof EDGES)[number]) &&
      typeof stored.offset === 'number' &&
      Number.isFinite(stored.offset) &&
      stored.offset >= 0 &&
      typeof stored.position === 'number' &&
      Number.isFinite(stored.position)
    ) {
      return {
        placement: {
          edge: stored.edge as DockPlacement['edge'],
          position: Math.min(1, Math.max(0, stored.position)),
        },
        offset: stored.offset,
      };
    }
  } catch {
    // Storage may be unavailable; in-memory navigation still shares its position.
  }
  return fallback;
}

export function DocumentationNavigationDock() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const locale = useAppLocale();
  const group = pathname.startsWith('/foundations')
    ? 'foundations'
    : pathname.startsWith('/tokens')
      ? 'tokens'
      : null;
  const [initial] = useState(readPosition);
  const [placement, setPlacement] = useState(initial.placement);
  const offset = useRef(initial.offset);
  const boundary = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!group || !boundary.current || !root.current) return;
    const measure = () => {
      const frame = boundary.current!.getBoundingClientRect();
      const dock = root.current!.getBoundingClientRect();
      const horizontal = placement.edge === 'top';
      const length = horizontal ? frame.width : frame.height;
      if (!length) return;
      const available = Math.max(0, length - (horizontal ? dock.width : dock.height));
      // Website navigation keeps the leading corner in pixels. Dock's public normalized
      // placement still handles movement; changing menu size must not move that corner.
      const pixels = Math.min(
        available,
        Math.max(0, offset.current ?? placement.position * available),
      );
      offset.current = pixels;
      const position = available > 0 ? pixels / available : 0;
      if (Math.abs(position - placement.position) > 0.000001)
        setPlacement({ edge: placement.edge, position });
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ edge: placement.edge, position, offset: pixels }),
        );
      } catch {
        // Placement remains usable without browser storage.
      }
    };
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(boundary.current);
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [group, locale, placement]);

  if (!group) return null;
  const items = (
    group === 'foundations' ? FOUNDATION_NAVIGATION_ITEMS : TOKEN_NAVIGATION_ITEMS
  ).map((item) => {
    const Icon = ICONS[item.label];
    return { ...item, label: t(item.label), icon: <Icon size={16} aria-hidden="true" /> };
  });

  return (
    <Dock.Boundary ref={boundary} className={styles.boundary} data-documentation-navigation="">
      <Dock.Root
        ref={root}
        className={styles.dock}
        defaultLocked
        defaultPinned
        allowedEdges={EDGES}
        placement={placement}
        onPlacementChange={(next) => {
          offset.current = null;
          setPlacement(next);
        }}
        snapDivisions={false}
      >
        {({ orientation }) => (
          <>
            <Dock.Handle aria-label={t(`${group}.navigation.move`)} />
            <Dock.Content>
              <SectionNavigation
                ariaLabel={t(`${group}.navigation.label`)}
                items={items}
                orientation={orientation}
              />
            </Dock.Content>
          </>
        )}
      </Dock.Root>
    </Dock.Boundary>
  );
}
