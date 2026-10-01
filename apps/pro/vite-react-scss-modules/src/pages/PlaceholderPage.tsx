import { Button, Card } from '@virgo-design/ui';
import { useNavigate } from 'react-router';

import styles from './PlaceholderPage.module.scss';

export function PlaceholderPage({ title, missing = false }: { title: string; missing?: boolean }) {
  const navigate = useNavigate();
  return (
    <div className={styles.page}>
      <Card variant="outlined">
        <Card.Header>
          <Card.Title as="h1">{title}</Card.Title>
          <Card.Description>
            {missing ? 'This address does not exist.' : 'Coming later'}
          </Card.Description>
        </Card.Header>
        <Card.Footer>
          <Button variant="outline" onClick={() => navigate('/dashboard/workplace')}>
            Back to Workplace
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
