import type { ColorScaleStep } from '@virgo-design/colors';
import { useState } from 'react';

import { THEME_BUILDER_DEFAULTS } from './defaults';
import type {
  ExportFormat,
  ScaleNaming,
  SemanticFamily,
  SemanticRole,
  ThemeBuilderState,
  ThemeMode,
} from './types';

function cloneDefaults(): ThemeBuilderState {
  return {
    ...THEME_BUILDER_DEFAULTS,
    semantics: {
      light: {
        ...THEME_BUILDER_DEFAULTS.semantics.light,
      },
      dark: {
        ...THEME_BUILDER_DEFAULTS.semantics.dark,
      },
    },
  };
}

export function useThemeBuilder() {
  const [state, setState] = useState<ThemeBuilderState>(cloneDefaults);

  const setThemeName = (themeName: string) => {
    setState((current) => ({ ...current, themeName }));
  };

  const setPrefix = (prefix: string) => {
    setState((current) => ({ ...current, prefix }));
  };

  const setScaleNaming = (scaleNaming: ScaleNaming) => {
    setState((current) => ({ ...current, scaleNaming }));
  };

  const setExportFormat = (exportFormat: ExportFormat) => {
    setState((current) => ({ ...current, exportFormat }));
  };

  const setSemanticFamily = (theme: ThemeMode, role: SemanticRole, family: SemanticFamily) => {
    setState((current) => ({
      ...current,
      semantics: {
        ...current.semantics,
        [theme]: {
          ...current.semantics[theme],
          [role]: {
            ...current.semantics[theme][role],
            family,
          },
        },
      },
    }));
  };

  const setSemanticStep = (theme: ThemeMode, role: SemanticRole, step: ColorScaleStep) => {
    setState((current) => ({
      ...current,
      semantics: {
        ...current.semantics,
        [theme]: {
          ...current.semantics[theme],
          [role]: {
            ...current.semantics[theme][role],
            step,
          },
        },
      },
    }));
  };

  const reset = () => {
    setState(cloneDefaults());
  };

  return {
    state,
    setThemeName,
    setPrefix,
    setScaleNaming,
    setExportFormat,
    setSemanticFamily,
    setSemanticStep,
    reset,
  };
}

export type ThemeBuilderController = ReturnType<typeof useThemeBuilder>;
