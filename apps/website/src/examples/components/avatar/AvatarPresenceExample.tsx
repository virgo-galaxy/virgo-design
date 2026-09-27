import './AvatarPresenceExample.module.scss';

import { Avatar, Badge } from '@virgo-design/ui';

export default function App() {
  return (
    <Badge dot intent="success" aria-label="Online">
      <Avatar fallback="PK" aria-label="Pokeya" />
    </Badge>
  );
}
