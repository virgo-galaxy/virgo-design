import { Tooltip } from '@virgo-design/ui';

export default function App() {
  return (
    <div dir="rtl">
      <Tooltip>
        <Tooltip.Trigger>RTL preview</Tooltip.Trigger>
        <Tooltip.Content placement="topStart">مساحة العمل · Workspace details</Tooltip.Content>
      </Tooltip>
    </div>
  );
}
