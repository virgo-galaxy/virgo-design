export const elevationLevels = [0, 1, 2, 3, 4, 5] as const;

export type ElevationLevel = (typeof elevationLevels)[number];

export type ElevationTheme = Record<ElevationLevel, string>;
