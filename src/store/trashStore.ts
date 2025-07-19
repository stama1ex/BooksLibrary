// store/trashStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Book } from '../types';

interface TrashStoreState {
  trash: Book[];
  addToTrash: (book: Book) => void;
  restoreFromTrash: (id: string) => Book | undefined;
  removeFromTrash: (id: string) => void;
  clearTrash: () => void;
}

export const useTrashStore = create<TrashStoreState>()(
  persist(
    devtools(
      immer((set) => ({
        trash: [],

        addToTrash: (book) =>
          set((state) => {
            state.trash.push(book);
          }),

        restoreFromTrash: (id) => {
          let restored: Book | undefined;

          set((state) => {
            const index = state.trash.findIndex((b) => b.id === id);
            if (index !== -1) {
              // сохраняем копию ДО удаления
              restored = { ...state.trash[index] };
              state.trash.splice(index, 1); // удаляем из корзины
            }
          });

          return restored;
        },
        removeFromTrash: (id) =>
          set((state) => {
            state.trash = state.trash.filter((b) => b.id !== id);
          }),

        clearTrash: () =>
          set((state) => {
            state.trash = [];
          }),
      }))
    ),
    {
      name: 'trash-store',
    }
  )
);
