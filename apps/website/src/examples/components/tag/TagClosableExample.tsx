import { Button, Tag } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './TagClosableExample.module.scss';

const initialTags = ['React', 'TypeScript', 'Design tokens'];

export default function App() {
  const { t } = useTranslation();

  const [tags, setTags] = useState(initialTags);
  return (
    <div className={styles.root!} aria-label={t('examples.tag.copy.closableTagCollection')}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          closable
          closeLabel={t('examples.tag.details.removeValue', {
            v0: translateExampleText(t, 'tag', String(tag)),
          })}
          onClose={() => setTags((current) => current.filter((value) => value !== tag))}
        >
          {translateExampleText(t, 'tag', tag)}
        </Tag>
      ))}
      <Tag closable disabled closeLabel={t('examples.tag.copy.removeTag')}>
        {t('examples.tag.copy.locked')}
      </Tag>
      <Button variant="text" size="small" onClick={() => setTags(initialTags)}>
        {t('examples.tag.copy.resetTags')}
      </Button>
    </div>
  );
}
