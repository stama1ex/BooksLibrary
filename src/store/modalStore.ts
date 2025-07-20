import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type ModalType = 'book-delete' | 'folder-delete' | null;

interface ModalState {
  isModalOpen: boolean;
  modalType: ModalType;

  setIsModalOpen: (value: boolean) => void;
  setModalType: (type: ModalType) => void;

  folderToDeleteKey: string;
  setFolderToDeleteKey: (key: string) => void;
}

export const useModalStore = create<ModalState>()(
  persist(
    devtools(
      immer((set) => ({
        isModalOpen: false,
        modalType: null,

        folderToDeleteKey: '',

        setIsModalOpen: (value) =>
          set((state) => {
            state.isModalOpen = value;
          }),

        setModalType: (type) =>
          set((state) => {
            state.modalType = type;
          }),

        setFolderToDeleteKey: (key) =>
          set((state) => {
            state.folderToDeleteKey = key;
          }),
      }))
    ),
    {
      name: 'modal-store',
      version: 1,
    }
  )
);
