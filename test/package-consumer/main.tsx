import './styles.css';
import './styles.scss';

import { Sparkline } from '@virgo-design/charts/sparkline';
import { UserIcon } from '@virgo-design/icons';
import brandUrl from '@virgo-design/icons/brands/virgo-design.svg?url';
import { Button as PrimitiveButton } from '@virgo-design/primitives';
import { Button, LocaleProvider } from '@virgo-design/ui';
import { enUS } from '@virgo-design/ui/locale';
import { createRoot } from 'react-dom/client';

import { panel } from './theme.css';

createRoot(document.getElementById('root')!).render(
  <LocaleProvider locale={enUS}>
    <main className={`${panel} scss-consumer text-text-primary`}>
      <img src={brandUrl} alt="Virgo" />
      <Button leadingIcon={<UserIcon />}>Published UI</Button>
      <PrimitiveButton>Published primitive</PrimitiveButton>
      <Sparkline
        data={[
          { day: 'Mon', value: 1 },
          { day: 'Tue', value: 2 },
        ]}
        xKey="day"
        dataKey="value"
        title="Published chart"
      />
    </main>
  </LocaleProvider>,
);
