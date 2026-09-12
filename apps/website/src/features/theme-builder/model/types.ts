import type { ColorFamily, ColorScaleStep } from '@virgo-design/colors';

export type SemanticRole = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ExportFormat = 'css' | 'scss' | 'tailwind';
export type ScaleNaming = 'virgo' | 'conventional';
export type ThemeMode = 'light' | 'dark';
export type SemanticFamily = ColorFamily | 'brand';

export interface SemanticAssignment {
  family: SemanticFamily;
  step: ColorScaleStep;
}

export type SemanticAssignments = Record<SemanticRole, SemanticAssignment>;
export type ThemeSemanticAssignments = Record<ThemeMode, SemanticAssignments>;

export interface ThemeBuilderState {
  themeName: string;
  prefix: string;
  scaleNaming: ScaleNaming;
  exportFormat: ExportFormat;
  semantics: ThemeSemanticAssignments;
}
