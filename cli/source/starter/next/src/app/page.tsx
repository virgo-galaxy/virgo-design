import { redirect } from 'next/navigation';

import { workplacePath } from './paths';

export default function HomePage() {
  redirect(workplacePath);
}
