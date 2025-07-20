import { Tabs } from 'antd';
import { useFolderStore } from '../../store/folderStore';
import BookList from '../BookList';
import { EditableTabLabel } from './EditableTabLabel';
import MyModal from '../../UI/MyModal';
import { useModalStore } from '../../store/modalStore';

export const FolderTabs = () => {
  const isModalOpen = useModalStore((s) => s.isModalOpen);
  const setIsModalOpen = useModalStore((s) => s.setIsModalOpen);
  const folderToDeleteKey = useModalStore((s) => s.folderToDeleteKey);
  const setFolderToDeleteKey = useModalStore((s) => s.setFolderToDeleteKey);
  const modalType = useModalStore((s) => s.modalType);
  const setModalType = useModalStore((s) => s.setModalType);
  const {
    folders,
    activeFolderKey,
    setActiveFolder,
    addFolder,
    removeFolder,
    setEditingFolderKey,
    editingFolderKey,
  } = useFolderStore();

  const handleConfirmDelete = () => {
    removeFolder(folderToDeleteKey);
    setIsModalOpen(false);
    setFolderToDeleteKey('');
    setModalType(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setModalType(null);
    setFolderToDeleteKey('');
  };

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
            const folder = folders.find((folder) => folder.key === targetKey);
            if (folder?.bookIds.length) {
              setModalType('folder-delete');
              setFolderToDeleteKey(targetKey);
              setIsModalOpen(true);
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
        open={isModalOpen && modalType === 'folder-delete'}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete folder with books?"
        content="This folder contains books. Are you sure you want to delete it?"
      />
    </div>
  );
};
