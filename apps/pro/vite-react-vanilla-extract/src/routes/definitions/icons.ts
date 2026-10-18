import {
  BriefcaseIcon,
  ChartLineIcon,
  CircleInfoIcon,
  GaugeIcon,
  ReceiptIcon,
  UserIcon,
} from '@virgo-design/icons';

export const routeIcons = {
  briefcase: BriefcaseIcon,
  'chart-line': ChartLineIcon,
  'circle-info': CircleInfoIcon,
  gauge: GaugeIcon,
  receipt: ReceiptIcon,
  user: UserIcon,
};

export type ProRouteIcon = keyof typeof routeIcons;
