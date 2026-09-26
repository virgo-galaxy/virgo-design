import { Empty } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Empty aria-label="Empty documents">
        <Empty.Title>No documents</Empty.Title>
      </Empty>
      <Empty aria-label="Empty projects">
        <Empty.Title>No projects yet</Empty.Title>
        <Empty.Description>Create a project to organize your team’s work.</Empty.Description>
      </Empty>
    </div>
  );
}
