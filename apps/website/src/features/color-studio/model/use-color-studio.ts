import {
  type ColorFamily,
  type ColorModel,
  generateColorPalette,
  generateColorScale,
  VIRGO_BRAND_BASE,
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_BASES,
  VIRGO_NEUTRAL_BASE,
  VIRGO_NEUTRAL_SCALE,
} from '@virgo-design/colors';
import { useMemo, useState } from 'react';

import type { FoundationGroupId } from '@/domain/foundation-colors';

import { VIRGO_STUDIO_DEFAULTS } from './defaults';
import type { ChromaticMode, ColorStudioState, FoundationPage } from './types';

const sameHex = (left: string, right: string) =>
  left.trim().toLowerCase() === right.trim().toLowerCase();

export function useColorStudio() {
  const [state, setState] = useState<ColorStudioState>(VIRGO_STUDIO_DEFAULTS);

  const palette = useMemo(() => {
    if (state.chromaticMode === 'linked') {
      return generateColorPalette({
        linked: true,
        anchor: state.anchor,
        anchorFamily: 'blue',
        model: state.model,
        hueSpread: state.hueSpread,
        distributionCurve: state.distributionCurve,
      });
    }

    return generateColorPalette({
      linked: false,
      model: state.chromaticMode === 'official' ? 'oklch' : state.model,
      bases: state.chromaticMode === 'official' ? { ...VIRGO_CHROMATIC_BASES } : state.customBases,
    });
  }, [
    state.anchor,
    state.chromaticMode,
    state.customBases,
    state.distributionCurve,
    state.hueSpread,
    state.model,
  ]);

  const brandBase = state.chromaticMode === 'official' ? VIRGO_BRAND_BASE : state.brandBase;
  const neutralBase = state.chromaticMode === 'official' ? VIRGO_NEUTRAL_BASE : state.neutralBase;

  const brandScale = useMemo(
    () =>
      sameHex(brandBase, VIRGO_BRAND_BASE) ? VIRGO_BRAND_SCALE : generateColorScale(brandBase),
    [brandBase],
  );

  const neutralScale = useMemo(
    () =>
      sameHex(neutralBase, VIRGO_NEUTRAL_BASE)
        ? VIRGO_NEUTRAL_SCALE
        : generateColorScale(neutralBase),
    [neutralBase],
  );

  const setChromaticMode = (chromaticMode: ChromaticMode) => {
    setState((current) => ({
      ...current,
      chromaticMode,
      customBases:
        chromaticMode === 'custom' && current.chromaticMode !== 'custom'
          ? { ...palette.bases }
          : current.customBases,
    }));
  };

  const setAnchor = (anchor: string) => {
    setState((current) => ({ ...current, anchor }));
  };

  const setModel = (model: ColorModel) => {
    setState((current) => ({ ...current, model }));
  };

  const setHueSpread = (hueSpread: number) => {
    setState((current) => ({ ...current, hueSpread }));
  };

  const setDistributionCurve = (distributionCurve: number) => {
    setState((current) => ({ ...current, distributionCurve }));
  };

  const setCustomBase = (family: ColorFamily, value: string) => {
    setState((current) => ({
      ...current,
      customBases: {
        ...current.customBases,
        [family]: value,
      },
    }));
  };

  const setSelectedFamily = (selectedFamily: ColorFamily) => {
    setState((current) => ({
      ...current,
      selectedFamily,
      selectedFoundation: selectedFamily,
    }));
  };

  const setSelectedFoundation = (selectedFoundation: FoundationGroupId) => {
    setState((current) => ({
      ...current,
      selectedFoundation,
      selectedFamily:
        selectedFoundation === 'brand' || selectedFoundation === 'neutral'
          ? current.selectedFamily
          : selectedFoundation,
    }));
  };

  const setFoundationPage = (foundationPage: FoundationPage) => {
    setState((current) => ({ ...current, foundationPage }));
  };

  const setBrandBase = (brandBase: string) => {
    setState((current) =>
      current.chromaticMode === 'official'
        ? current
        : {
            ...current,
            brandBase,
            selectedFoundation: 'brand',
          },
    );
  };

  const setNeutralBase = (neutralBase: string) => {
    setState((current) =>
      current.chromaticMode === 'official'
        ? current
        : {
            ...current,
            neutralBase,
            selectedFoundation: 'neutral',
          },
    );
  };

  const resetBrand = () => {
    setState((current) => ({
      ...current,
      brandBase: VIRGO_BRAND_BASE,
      selectedFoundation: 'brand',
    }));
  };

  const resetNeutral = () => {
    setState((current) => ({
      ...current,
      neutralBase: VIRGO_NEUTRAL_BASE,
      selectedFoundation: 'neutral',
    }));
  };

  const reset = () => {
    setState((current) => ({
      ...current,
      chromaticMode: VIRGO_STUDIO_DEFAULTS.chromaticMode,
      anchor: VIRGO_STUDIO_DEFAULTS.anchor,
      model: VIRGO_STUDIO_DEFAULTS.model,
      hueSpread: VIRGO_STUDIO_DEFAULTS.hueSpread,
      distributionCurve: VIRGO_STUDIO_DEFAULTS.distributionCurve,
      customBases: { ...VIRGO_STUDIO_DEFAULTS.customBases },
      selectedFamily: VIRGO_STUDIO_DEFAULTS.selectedFamily,
      selectedFoundation: VIRGO_STUDIO_DEFAULTS.selectedFamily,
    }));
  };

  return {
    state,
    palette,
    brandBase,
    neutralBase,
    brandScale,
    neutralScale,
    setChromaticMode,
    setAnchor,
    setModel,
    setHueSpread,
    setDistributionCurve,
    setCustomBase,
    setSelectedFamily,
    setSelectedFoundation,
    setFoundationPage,
    setBrandBase,
    setNeutralBase,
    resetBrand,
    resetNeutral,
    reset,
  };
}

export type ColorStudioController = ReturnType<typeof useColorStudio>;
