// src/__tests__/trashStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useTrashStore } from '../store/trashStore';
import { useBookStore } from '../store/bookStore';
import type { Book, TrashedBook } from '../types';

beforeEach(() => {
  // Сбрасываем состояние корзины
  useTrashStore.setState({ trash: [] });

  // Мокаем addBookBack из bookStore
  useBookStore.setState({
    addBookBack: jest.fn(),
  });
});

describe('Trash Store', () => {
  test('adds a book to trash', () => {
    const { result } = renderHook(() => useTrashStore());

    const trashedBook: TrashedBook = {
      id: 'b1',
      title: 'Trash Book',
      author: 'Author',
      isFavorite: false,
      folderId: 'folder-1',
      deletedAt: new Date().toISOString(),
      originalFolderKey: 'folder-1',
      originalFolderLabel: 'Folder 1',
      deletedFromFolderLabel: 'Folder 1',
    };

    act(() => {
      result.current.addToTrash(trashedBook);
    });

    expect(result.current.trash).toHaveLength(1);
    expect(result.current.trash[0].id).toBe('b1');
  });

  test('restores a book from trash', () => {
    const { result } = renderHook(() => useTrashStore());

    const trashedBook: TrashedBook = {
      id: 'b2',
      title: 'To Restore',
      author: 'Author',
      isFavorite: true,
      folderId: null,
      deletedAt: new Date().toISOString(),
      originalFolderKey: 'folder-2',
      originalFolderLabel: 'Folder 2',
    };

    act(() => {
      result.current.addToTrash(trashedBook);
    });

    let restored: Book | undefined;
    act(() => {
      restored = result.current.restoreFromTrash('b2');
    });

    expect(result.current.trash.find((b) => b.id === 'b2')).toBeUndefined();

    const addBookBackMock = useBookStore.getState().addBookBack;
    expect(addBookBackMock).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'b2',
        title: 'To Restore',
      })
    );

    expect(restored).toEqual(
      expect.objectContaining({
        id: 'b2',
        title: 'To Restore',
      })
    );
  });

  test('removes a book from trash', () => {
    const { result } = renderHook(() => useTrashStore());

    const trashedBook: TrashedBook = {
      id: 'b3',
      title: 'To Remove',
      author: 'Author',
      isFavorite: false,
      folderId: null,
      deletedAt: new Date().toISOString(),
      originalFolderKey: 'folder-3',
      originalFolderLabel: 'Folder 3',
    };

    act(() => {
      result.current.addToTrash(trashedBook);
    });

    act(() => {
      result.current.removeFromTrash('b3');
    });

    expect(result.current.trash.find((b) => b.id === 'b3')).toBeUndefined();
  });

  test('clears the trash', () => {
    const { result } = renderHook(() => useTrashStore());

    const book1: TrashedBook = {
      id: 'b4',
      title: 'Book 4',
      author: 'Author',
      isFavorite: false,
      folderId: null,
      deletedAt: new Date().toISOString(),
      originalFolderKey: 'folder-4',
      originalFolderLabel: 'Folder 4',
    };

    const book2: TrashedBook = {
      id: 'b5',
      title: 'Book 5',
      author: 'Author',
      isFavorite: false,
      folderId: null,
      deletedAt: new Date().toISOString(),
      originalFolderKey: 'folder-5',
      originalFolderLabel: 'Folder 5',
    };

    act(() => {
      result.current.addToTrash(book1);
      result.current.addToTrash(book2);
    });

    expect(result.current.trash).toHaveLength(2);

    act(() => {
      result.current.clearTrash();
    });

    expect(result.current.trash).toHaveLength(0);
  });
});
