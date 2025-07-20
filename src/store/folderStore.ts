import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface Folder {
  key: string;
  label: string;
  bookIds: string[]; // ссылки на книги
}

interface FolderStoreState {
  folders: Folder[];
  activeFolderKey: string;
  editingFolderKey: string | null; // новое поле для текущей редактируемой папки
  setActiveFolder: (key: string) => void;
  setEditingFolderKey: (key: string | null) => void; // новое действие
  addFolder: (label?: string, key?: string) => string; // возвращает ключ новой папки
  removeFolder: (key: string) => void;
  renameFolder: (key: string, newLabel: string) => void;
  moveBookToFolder: (bookId: string, targetFolderKey: string) => void;
}

export const useFolderStore = create<FolderStoreState>()(
  persist(
    devtools(
      immer<FolderStoreState>((set) => ({
        folders: [{ key: 'default', label: 'My books', bookIds: [] }],
        activeFolderKey: 'default',
        editingFolderKey: null,

        setActiveFolder: (key) =>
          set((state) => {
            state.activeFolderKey = key;
          }),
        setEditingFolderKey: (key) =>
          set((state) => {
            state.editingFolderKey = key;
          }),

        addFolder: (label, key?) => {
          let newKey = '';
          set((state) => {
            newKey = key || `folder-${Date.now()}`;
            state.folders.push({
              key: newKey,
              label: label || 'New Folder',
              bookIds: [],
            });
            state.activeFolderKey = newKey;

            // Только если создаём новую папку вручную, включаем режим редактирования
            if (!key) {
              state.editingFolderKey = newKey;
            }
          });
          return newKey;
        },

        moveBookToFolder: (bookId, targetFolderKey) =>
          set((state) => {
            // Удаляем книгу из всех папок
            state.folders.forEach((f) => {
              f.bookIds = f.bookIds.filter((id) => id !== bookId);
            });
            // Добавляем в целевую папку
            const targetFolder = state.folders.find(
              (f) => f.key === targetFolderKey
            );
            if (targetFolder) {
              targetFolder.bookIds.push(bookId);
            }
          }),

        renameFolder: (key, newLabel) =>
          set((state) => {
            const folder = state.folders.find((f) => f.key === key);
            if (folder) folder.label = newLabel;
            state.editingFolderKey = null; // после переименования выходим из режима редактирования
          }),

        removeFolder: (key) =>
          set((state) => {
            state.folders = state.folders.filter((f) => f.key !== key);
            if (state.activeFolderKey === key)
              state.activeFolderKey = 'default';
            if (state.editingFolderKey === key) state.editingFolderKey = null;
          }),

        // другие методы...
      }))
    ),
    {
      name: 'folder-store',
      version: 1,
    }
  )
);
