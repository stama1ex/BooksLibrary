import { Tabs, Popover } from 'antd';
import { useFolderStore } from '../../store/folderStore';
import BookList from '../BookList';
import { EditableTabLabel } from './EditableTabLabel';
import MyModal from '../../UI/MyModal';
import { useState, useEffect } from 'react';
import { useBookStore } from '../../store/bookStore';

export const FolderTabs = () => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  useEffect(() => {
    const hasShown = localStorage.getItem('folderRenamePopoverShown');
    if (!hasShown) {
      setIsPopoverVisible(true);
      localStorage.setItem('folderRenamePopoverShown', 'true');
    }
  }, []);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [folderKeyToDelete, setFolderKeyToDelete] = useState<string | null>(
    null
  );

  const {
    folders,
    activeFolderKey,
    setActiveFolder,
    addFolder,
    removeFolder,
    setEditingFolderKey,
    editingFolderKey,
  } = useFolderStore();

  // Подписка на книги — чтобы компонент обновлялся при их изменениях
  const books = useBookStore((state) => state.books);

  return (
    <div className="flex flex-col p-8 bg-gray-200 dark:bg-gray-700 transition-colors duration-200 rounded-2xl w-full shadow-2xl break-all">
      <h1 className="text-gray-800 dark:text-white text-2xl font-bold text-center mb-6">
        Book List
      </h1>

      <Tabs
        type="editable-card"
        activeKey={activeFolderKey}
        onChange={setActiveFolder}
        onEdit={(targetKey, action) => {
          if (action === 'add') {
            const newName = prompt('Enter folder name:');
            if (newName) addFolder(newName);
          } else if (action === 'remove' && typeof targetKey === 'string') {
            const booksInFolder = books.filter(
              (book) => book.folderId === targetKey
            );

            if (booksInFolder.length > 0) {
              setFolderKeyToDelete(targetKey);
              setIsDeleteModalOpen(true);
            } else {
              removeFolder(targetKey);
            }
          }
        }}
        items={folders.map((folder) => {
          const bookCount = books.filter(
            (b) => b.folderId === folder.key
          ).length;

          const editableLabel = (
            <EditableTabLabel
              key={folder.key}
              folderKey={folder.key}
              label={folder.label}
              isEditing={editingFolderKey === folder.key}
              setEditingFolderKey={(key) => {
                setEditingFolderKey(key);
                if (isPopoverVisible) setIsPopoverVisible(false);
              }}
              bookCount={bookCount}
            />
          );

          const labelWithPopover =
            folder.key === 'default' && isPopoverVisible ? (
              <Popover
                content="Double click to rename"
                open={isPopoverVisible}
                trigger="hover"
                onOpenChange={(visible) => {
                  if (visible) setIsPopoverVisible(false); // скрываем навсегда после первого показа
                }}
              >
                <div
                  tabIndex={0}
                  onClick={() => {
                    setIsPopoverVisible(false); // скрываем при клике
                  }}
                >
                  {editableLabel}
                </div>
              </Popover>
            ) : (
              editableLabel
            );

          return {
            label: labelWithPopover,
            key: folder.key,
            closable: folder.key !== 'default',
          };
        })}
        className="mb-6"
      />

      <BookList folderId={activeFolderKey} />
      <MyModal
        open={isDeleteModalOpen}
        title="Delete folder?"
        content="This folder contains books. Are you sure you want to delete it?"
        onOk={() => {
          if (folderKeyToDelete) {
            // Удаляем все книги, находящиеся в этой папке
            books
              .filter((book) => book.folderId === folderKeyToDelete)
              .forEach((book) => {
                useBookStore.getState().deleteBook(book.id);
              });

            // Затем удаляем папку
            removeFolder(folderKeyToDelete);
          }

          setIsDeleteModalOpen(false);
          setFolderKeyToDelete(null);
        }}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setFolderKeyToDelete(null);
        }}
      />
    </div>
  );
};
