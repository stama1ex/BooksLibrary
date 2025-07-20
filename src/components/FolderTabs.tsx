import { Tabs } from 'antd';
import { useFolderStore } from '../store/folderStore';
import BookList from './BookList';
import { EditableTabLabel } from './EditableTabLabel';

export const FolderTabs = () => {
  const {
    folders,
    activeFolderKey,
    setActiveFolder,
    addFolder,
    removeFolder,
    setEditingFolderKey,
    editingFolderKey, // добавьте это!
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
            // const newKey = addFolder('New Folder');
            // setEditingFolderKey(newKey);
          } else if (action === 'remove' && typeof targetKey === 'string') {
            removeFolder(targetKey);
          }
        }}
        items={folders.map((folder) => ({
          label: (
            <EditableTabLabel
              key={folder.key}
              folderKey={folder.key}
              label={folder.label}
              isEditing={editingFolderKey === folder.key} // передаем!
              setEditingFolderKey={setEditingFolderKey} // передаем!
            />
          ),
          key: folder.key,
          closable: folder.key !== 'default',
        }))}
        className="mb-6"
      />

      <BookList folderId={activeFolderKey} />
    </div>
  );
};
