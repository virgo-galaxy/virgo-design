import './RadioHorizontalExample.module.scss';

import { Radio } from '@virgo-design/ui';

export default function App() {
  return (
    <Radio.Group defaultValue="pear" orientation="horizontal" aria-label="Horizontal fruit">
      <Radio value="apple">Apple</Radio>
      <Radio value="pear">Pear</Radio>
      <Radio value="orange">Orange</Radio>
    </Radio.Group>
  );
}
