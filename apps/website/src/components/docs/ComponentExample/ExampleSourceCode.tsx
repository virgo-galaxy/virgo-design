import { useEffect, useState } from 'react';

interface ExampleSourceCodeProps {
  source: string;
  language: 'tsx' | 'scss';
  active: boolean;
}

export function ExampleSourceCode({ source, language, active }: ExampleSourceCodeProps) {
  const [highlighted, setHighlighted] = useState<{
    source: string;
    language: ExampleSourceCodeProps['language'];
    markup: string;
  }>();
  const markup =
    highlighted?.source === source && highlighted.language === language
      ? highlighted.markup
      : undefined;

  useEffect(() => {
    if (!active || markup !== undefined || typeof Worker === 'undefined') return;

    let current = true;
    void import('./example-source-highlighter')
      .then(({ sourceHighlighter }) =>
        current ? sourceHighlighter.highlight(source, { language }) : undefined,
      )
      .then(
        (result) => {
          if (current && result) setHighlighted({ source, language, markup: result.value });
        },
        () => {
          // Keep the original source visible if the model or runtime is unavailable.
        },
      );

    return () => {
      current = false;
    };
  }, [active, language, markup, source]);

  if (markup === undefined) return <code data-language={language}>{source}</code>;

  // NSH's value contains escaped source text inside its own token markup.
  return <code data-language={language} dangerouslySetInnerHTML={{ __html: markup }} />;
}
