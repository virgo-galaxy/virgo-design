import '../bootstrap/initialize';

import { AppBootstrap } from '../bootstrap/AppBootstrap';
import { ProControlLabels } from '../composition/providers/ProControlLabels';
import { RouterApp } from '../router/RouterApp';

export function App() {
  return (
    <ProControlLabels>
      <AppBootstrap>
        <RouterApp />
      </AppBootstrap>
    </ProControlLabels>
  );
}
