import type {
  FontFamilyToken,
  FontSizeToken,
  FontWeightToken,
  LineHeightToken,
} from '../foundations/typography.js';
import type {
  BorderColorRole,
  BrandColorRole,
  CategoricalDataColorRole,
  FillColorRole,
  IconColorRole,
  SequentialDataColorRole,
  StatusColorFamily,
  StatusColorRole,
  SurfaceColorRole,
  TextColorRole,
} from '../semantic/color/index.js';

export interface SemanticTypographyToken {
  fontFamily: FontFamilyToken;
  fontSize: FontSizeToken;
  fontWeight: FontWeightToken;
  lineHeight: LineHeightToken;
}

export interface ResolvedTypographyStyle {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
}

export type SemanticColorValue = string;

export interface DivergingDataColorTheme {
  negative: Readonly<Record<'strong' | 'default' | 'subtle', SemanticColorValue>>;
  neutral: SemanticColorValue;
  positive: Readonly<Record<'subtle' | 'default' | 'strong', SemanticColorValue>>;
}

export interface DataColorTheme {
  categorical: Readonly<Record<CategoricalDataColorRole, SemanticColorValue>>;
  sequential: Readonly<Record<SequentialDataColorRole, SemanticColorValue>>;
  diverging: DivergingDataColorTheme;
}

export interface ColorSemanticTheme {
  text: Readonly<Record<TextColorRole, SemanticColorValue>>;
  surface: Readonly<Record<SurfaceColorRole, SemanticColorValue>>;
  border: Readonly<Record<BorderColorRole, SemanticColorValue>>;
  icon: Readonly<Record<IconColorRole, SemanticColorValue>>;
  brand: Readonly<Record<BrandColorRole, SemanticColorValue>>;
  status: Readonly<
    Record<StatusColorFamily, Readonly<Record<StatusColorRole, SemanticColorValue>>>
  >;
  fill: Readonly<Record<FillColorRole, SemanticColorValue>>;
  data: DataColorTheme;
}
