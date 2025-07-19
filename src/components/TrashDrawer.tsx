import { Drawer, Button, List, Typography, Empty, Popconfirm } from 'antd';
import { useTrashStore } from '../store/trashStore';
import { useBookStore } from '../store/bookStore';

interface TrashDrawerProps {
  open: boolean;
  onClose: () => void;
}

const TrashDrawer: React.FC<TrashDrawerProps> = ({ open, onClose }) => {
  const trash = useTrashStore((s) => s.trash);
  const removeFromTrash = useTrashStore((s) => s.removeFromTrash);
  const clearTrash = useTrashStore((s) => s.clearTrash);

  const handleRestore = (id: string) => {
    const restored = useTrashStore.getState().restoreFromTrash(id); // ✅ уже копия
    if (restored) {
      useBookStore.getState().addBook(restored);
    }
  };

  return (
    <Drawer
      title="🗑 Trash Bin"
      placement="right"
      onClose={onClose}
      open={open}
      width={360}
    >
      {trash.length === 0 ? (
        <Empty description="Trash is empty" />
      ) : (
        <List
          dataSource={trash}
          itemLayout="horizontal"
          renderItem={(book) => (
            <List.Item
              actions={[
                <Button size="small" onClick={() => handleRestore(book.id)}>
                  Restore
                </Button>,
                <Popconfirm
                  title="Remove this book from trash?"
                  onConfirm={() => removeFromTrash(book.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger size="small">
                    Delete
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={<Typography.Text>{book.title}</Typography.Text>}
                description={book.author}
              />
            </List.Item>
          )}
        />
      )}
      {trash.length > 0 && (
        <div className="flex justify-end mt-4">
          <Popconfirm
            title="Are you sure you want to clear all trash?"
            onConfirm={clearTrash}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Clear Trash</Button>
          </Popconfirm>
        </div>
      )}
    </Drawer>
  );
};

export default TrashDrawer;
