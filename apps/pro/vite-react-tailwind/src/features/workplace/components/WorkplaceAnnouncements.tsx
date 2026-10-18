import { Surface, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { getAnnouncements } from '@/api/workspace';
import { ResourceContent } from '@/components/feedback/resource-content';
import { useRemoteData } from '@/hooks/async/use-remote-data';

export function WorkplaceAnnouncements() {
  const resource = useRemoteData(getAnnouncements);
  const { t } = useTranslation();

  return (
    <ResourceContent resource={resource}>
      {(announcements) => (
        <>
          {announcements.map((announcement) => (
            <Surface
              key={announcement.id}
              border="subtle"
              radius={8}
              className={[
                'flex items-center gap-16 [padding:var(--vd-spacing-16)_var(--vd-spacing-20)]',
                '[&_strong]:text-(length:--vd-font-size-12) [&_strong]:[font-weight:var(--vd-font-weight-500)] [&_p]:[margin:var(--vd-spacing-4)_0_0]',
                '[&_p]:text-(length:--vd-font-size-11) [&_p]:text-text-tertiary [&_p]:[line-height:var(--vd-line-height-4)] [&_>_span:last-child]:ms-auto',
                '[&_>_span:last-child]:flex-none',
                'viewport-max-640:flex-wrap viewport-max-640:[&_>_span:last-child]:hidden',
              ].join(' ')}
            >
              <span
                className="bg-brand-primary [border-radius:var(--vd-shape-radius-4,_var(--vd-radius-4))] [width:3px] self-stretch flex-none"
                aria-hidden="true"
              />
              <div>
                <strong>{t('workplace.announcement.title')}</strong>
                <p>{t('workplace.announcement.body')}</p>
              </div>
              <Tag size="sm" intent="info" variant="soft">
                {t('workplace.teamNote')}
              </Tag>
            </Surface>
          ))}
        </>
      )}
    </ResourceContent>
  );
}
