import { Surface, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { getAnnouncements } from '@/api/workspace';
import { ResourceContent } from '@/shared/async/ResourceContent';
import { useRemoteData } from '@/shared/async/use-remote-data';

import styles from '../styles/workplace.module.scss';

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
              className={styles.announcement}
            >
              <span className={styles.announcementMarker} aria-hidden="true" />
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
