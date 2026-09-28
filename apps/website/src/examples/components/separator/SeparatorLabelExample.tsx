import { Separator } from '@virgo-design/ui';

import styles from './SeparatorLabelExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <p>Shape the next release in one shared workspace.</p>
      <Separator labelAlign="start">Working draft</Separator>
      <p>Keep decisions close to the details they change.</p>
      <Separator>In review</Separator>
      <p>A clear handoff gives the next step room to begin.</p>
      <Separator labelAlign="end">Ready to ship</Separator>
    </div>
  );
}
