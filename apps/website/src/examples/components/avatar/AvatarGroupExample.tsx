import { Avatar } from '@virgo-design/ui';

export default function App() {
  return (
    <Avatar.Group aria-label="Project members">
      <Avatar fallback="PK" aria-label="Pokeya" />
      <Avatar fallback="VD" aria-label="Virgo Design" />
      <Avatar fallback="UI" aria-label="UI team" />
    </Avatar.Group>
  );
}
