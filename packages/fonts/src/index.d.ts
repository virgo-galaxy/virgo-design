export declare const sansFonts: {
  readonly inter: {
    readonly name: 'Inter';
    readonly cssFamily: '"Inter Variable"';
  };
  readonly instrumentSans: {
    readonly name: 'Instrument Sans';
    readonly cssFamily: '"Instrument Sans Variable"';
  };
  readonly figtree: {
    readonly name: 'Figtree';
    readonly cssFamily: '"Figtree Variable"';
  };
  readonly ibmPlexSans: {
    readonly name: 'IBM Plex Sans';
    readonly cssFamily: '"IBM Plex Sans Variable"';
  };
  readonly notoSansSC: {
    readonly name: 'Noto Sans SC';
    readonly cssFamily: '"Noto Sans SC Variable"';
  };
  readonly notoSansTC: {
    readonly name: 'Noto Sans TC';
    readonly cssFamily: '"Noto Sans TC Variable"';
  };
  readonly notoSansHK: {
    readonly name: 'Noto Sans HK';
    readonly cssFamily: '"Noto Sans HK Variable"';
  };
  readonly notoSansJP: {
    readonly name: 'Noto Sans JP';
    readonly cssFamily: '"Noto Sans JP Variable"';
  };
  readonly notoSansKR: {
    readonly name: 'Noto Sans KR';
    readonly cssFamily: '"Noto Sans KR Variable"';
  };
};

export declare const monoFonts: {
  readonly jetbrainsMono: {
    readonly name: 'JetBrains Mono';
    readonly cssFamily: '"JetBrains Mono Variable"';
  };
  readonly googleSansCode: {
    readonly name: 'Google Sans Code';
    readonly cssFamily: '"Google Sans Code Variable"';
  };
  readonly redHatMono: {
    readonly name: 'Red Hat Mono';
    readonly cssFamily: '"Red Hat Mono Variable"';
  };
  readonly sourceCodePro: {
    readonly name: 'Source Code Pro';
    readonly cssFamily: '"Source Code Pro Variable"';
  };
  readonly geistMono: {
    readonly name: 'Geist Mono';
    readonly cssFamily: '"Geist Mono Variable"';
  };
  readonly kodeMono: {
    readonly name: 'Kode Mono';
    readonly cssFamily: '"Kode Mono Variable"';
  };
};

export type SansFont = keyof typeof sansFonts;
export type MonoFont = keyof typeof monoFonts;
