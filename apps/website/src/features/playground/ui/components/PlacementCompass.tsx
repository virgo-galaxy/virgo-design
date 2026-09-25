import './PlacementCompass.scss';

import type { DropdownPlacement } from '@virgo-design/ui';
import type { ReactNode } from 'react';

const positions = [
  ['topLeft', 'TL', 1, 2],
  ['top', 'Top', 1, 3],
  ['topRight', 'TR', 1, 4],
  ['leftTop', 'LT', 2, 1],
  ['left', 'Left', 3, 1],
  ['leftBottom', 'LB', 4, 1],
  ['rightTop', 'RT', 2, 5],
  ['right', 'Right', 3, 5],
  ['rightBottom', 'RB', 4, 5],
  ['bottomLeft', 'BL', 5, 2],
  ['bottom', 'Bottom', 5, 3],
  ['bottomRight', 'BR', 5, 4],
] as const;

export function PlacementCompass({
  children,
}: {
  children: (placement: DropdownPlacement, label: string) => ReactNode;
}) {
  return (
    <div className="placement-compass" role="group" aria-label="Twelve placements">
      {positions.map(([placement, label, row, column]) => (
        <div
          key={placement}
          className="placement-compass-cell"
          style={{ gridRow: row, gridColumn: column }}
        >
          {children(placement, label)}
        </div>
      ))}
    </div>
  );
}
