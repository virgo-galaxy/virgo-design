import '@virgo-design/fonts/sans/inter.css';
import '@virgo-design/fonts/sans/noto-sans-sc.css';
import '@virgo-design/fonts/mono/jetbrains-mono.css';
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import '@/styles/global.scss';
import '../composition/i18n/initialize';

import { initializeProTheme } from '@/features/settings';

initializeProTheme();
