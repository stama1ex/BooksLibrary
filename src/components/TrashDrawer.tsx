import {
  Drawer,
  Button,
  List,
  Typography,
  Empty,
  Popconfirm,
  Tag,
  Divider,
} from 'antd';
import { useTrashStore } from '../store/trashStore';
import dayjs from 'dayjs';
import type { TrashedBook } from '../types';

interface TrashDrawerProps {
  open: boolean;
  onClose: () => void;
}

const TrashDrawer: React.FC<TrashDrawerProps> = ({ open, onClose }) => {
  const trash = useTrashStore((s) => s.trash);
  const removeFromTrash = useTrashStore((s) => s.removeFromTrash);
  const clearTrash = useTrashStore((s) => s.clearTrash);

  const handleRestore = (id: string) => {
    useTrashStore.getState().restoreFromTrash(id);
  };

  // Группируем книги по удалению (точность до минуты)
  const grouped: Record<string, TrashedBook[]> = {};
  trash.forEach((book) => {
    const key = dayjs(book.deletedAt).format('HH:mm DD/MM');
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(book);
  });

  // Сортируем метки времени по убыванию (новые сверху)
  const sortedTimestamps = Object.keys(grouped).sort((a, b) => {
    const dateA = dayjs(grouped[a][0].deletedAt).valueOf();
    const dateB = dayjs(grouped[b][0].deletedAt).valueOf();
    return dateB - dateA;
  });

  return (
    <Drawer
      title="🗑 Trash Bin"
      placement="left"
      onClose={onClose}
      open={open}
      width={360}
    >
      {trash.length === 0 ? (
        <Empty description="Trash is empty" />
      ) : (
        <>
          {sortedTimestamps.map((timestamp) => (
            <div key={timestamp} className="mb-4">
              <Divider orientation="center">
                <Typography.Text type="secondary" className="!justify-center">
                  {timestamp}
                </Typography.Text>
              </Divider>
              <List
                dataSource={grouped[timestamp]}
                itemLayout="horizontal"
                renderItem={(book) => (
                  <List.Item
                    actions={[
                      <Button
                        size="small"
                        onClick={() => handleRestore(book.id)}
                        key="restore"
                      >
                        Restore
                      </Button>,
                      <Popconfirm
                        title="Remove this book from trash?"
                        onConfirm={() => removeFromTrash(book.id)}
                        okText="Yes"
                        cancelText="No"
                        key="delete"
                      >
                        <Button danger size="small">
                          Delete
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Typography.Text>
                          {book.title}
                          <Tag
                            className="!m-0.5 !bg-transparent"
                            color="geekblue"
                          >
                            <span className="!mr-auto">
                              {book.deletedFromFolderLabel || 'Unknown Folder'}
                            </span>
                          </Tag>
                        </Typography.Text>
                      }
                      description={book.author}
                    />
                  </List.Item>
                )}
              />
            </div>
          ))}
        </>
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
