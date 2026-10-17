import { Table } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function TableExample() {
  const { t } = useTranslation();

  return (
    <Table data-docs-primitive="table">
      <Table.Caption>{t('primitives.examples.displayName')}</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.Head>{t('primitives.examples.file')}</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>README.md</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
