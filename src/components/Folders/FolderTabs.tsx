import { Tabs } from 'antd';
import { useFolderStore } from '../../store/folderStore';
import BookList from '../BookList';
import { EditableTabLabel } from './EditableTabLabel';
import MyModal from '../../UI/MyModal';
import { useState } from 'react';
import { useBookStore } from '../../store/bookStore';

export const FolderTabs = () => {
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
            const booksInFolder = useBookStore
              .getState()
              .books.filter((book) => book.folderId === targetKey);

            if (booksInFolder.length > 0) {
              setFolderKeyToDelete(targetKey);
              setIsDeleteModalOpen(true);
            } else {
              removeFolder(targetKey);
            }
          }
        }}
        items={folders.map((folder) => ({
          label: (
            <EditableTabLabel
              key={folder.key}
              folderKey={folder.key}
              label={folder.label}
              isEditing={editingFolderKey === folder.key}
              setEditingFolderKey={setEditingFolderKey}
            />
          ),
          key: folder.key,
          closable: folder.key !== 'default',
        }))}
        className="mb-6"
      />

      <BookList folderId={activeFolderKey} />
      <MyModal
        open={isDeleteModalOpen}
        title="Delete folder?"
        content="This folder contains books. Are you sure you want to delete it?"
        onOk={() => {
          if (folderKeyToDelete) {
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
