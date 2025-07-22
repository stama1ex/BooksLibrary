// src/__tests__/bookStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useBookStore } from '../store/bookStore';
import { useFolderStore } from '../store/folderStore';
import type { BookFormData } from '../types';

beforeEach(() => {
  const folderState = useFolderStore.getState();
  folderState.addFolder('Default', 'default-folder');
  folderState.setActiveFolder('default-folder');
  useBookStore.setState({ books: [], isLoading: false });
});

describe('Book Store', () => {
  test('adds a book', () => {
    const { result } = renderHook(() => useBookStore());
    const formData: BookFormData = { title: 'Test Book', author: 'Author' };

    act(() => {
      result.current.addBook(formData);
    });

    expect(result.current.books).toHaveLength(1);
    expect(result.current.books[0].title).toBe('Test Book');
  });

  test('toggles favorite status', () => {
    const { result } = renderHook(() => useBookStore());
    const formData: BookFormData = { title: 'Favorite Book', author: 'Author' };

    act(() => {
      result.current.addBook(formData);
    });

    const bookId = result.current.books[0].id;

    act(() => {
      result.current.toggleFavorite(bookId);
    });

    expect(result.current.books[0].isFavorite).toBe(true);
  });

  test('deletes a book', () => {
    const { result } = renderHook(() => useBookStore());
    const formData: BookFormData = { title: 'To delete', author: 'Author' };

    act(() => {
      result.current.addBook(formData);
    });

    const id = result.current.books[0].id;

    act(() => {
      result.current.deleteBook(id);
    });

    expect(result.current.books).toHaveLength(0);
  });
});
