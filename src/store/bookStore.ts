import axios from 'axios';
import { toast } from 'react-toastify';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Book, BookFormData } from '../types';
import { createNewBook } from '../utils/createNewBook';

interface BookStoreState {
  books: Readonly<Book[]>;
  isLoading: boolean;
  addBook: (data: BookFormData) => void;
  deleteBook: (id: string) => void;
  toggleFavorite: (id: string) => void;
  setBooks: (books: Book[]) => void;
  fetchAndAddRandomBook: (url: string) => Promise<void>;
}

export const useBookStore = create<BookStoreState>()(
  persist(
    devtools(
      immer<BookStoreState>((set) => ({
        books: [],
        isLoading: false,

        addBook: (data) =>
          set((state) => {
            state.books.push(createNewBook(data));
          }),

        deleteBook: (id) =>
          set((state: BookStoreState) => {
            state.books = state.books.filter((b) => b.id !== id);
          }),

        toggleFavorite: (id) =>
          set((state: BookStoreState) => {
            const book = state.books.find((b) => b.id === id);
            if (book) book.isFavorite = !book.isFavorite;
          }),

        setBooks: (books) =>
          set((state) => {
            state.books = books;
          }),

        fetchAndAddRandomBook: async (url: string) => {
          set({ isLoading: true });
          try {
            const res = await axios.get(url);
            const data = res.data as BookFormData;
            set((state) => {
              state.books.push(createNewBook(data));
            });
          } catch (error) {
            const message = axios.isAxiosError(error)
              ? error.response?.data?.message || error.message
              : error instanceof Error
                ? error.message
                : 'Unknown error';
            toast.error(message);
          } finally {
            set({ isLoading: false });
          }
        },
      }))
    ),
    {
      name: 'book-store',
      version: 1,
      partialize: (state) => ({
        books: state.books,
      }),
    }
  )
);
