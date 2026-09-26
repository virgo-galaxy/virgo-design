import { Pagination } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <Pagination
        total={85}
        showAll
        previousLabel="上一页"
        nextLabel="下一页"
        labels={{
          navigation: '分页',
          previous: '上一页',
          next: '下一页',
          page: (value) => `第 ${value} 页`,
          jumpBackward: '向前跳 5 页',
          jumpForward: '向后跳 5 页',
          pageSize: '每页条数',
          itemsPerPage: (size) => `${size} 条/页`,
          jumpTo: '跳至',
          pageUnit: '页',
          total: (total) => `共 ${total} 条`,
        }}
      />
    </div>
  );
}
