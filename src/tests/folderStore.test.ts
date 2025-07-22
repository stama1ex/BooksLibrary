// src/__tests__/folderStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { useFolderStore } from '../store/folderStore';

beforeEach(() => {
  // Сбрасываем состояние стора к дефолту
  useFolderStore.setState({
    folders: [
      {
        key: 'default',
        label: 'Default folder',
        bookIds: [],
      },
    ],
    activeFolderKey: 'default',
    editingFolderKey: null,
  });
});

describe('Folder Store', () => {
  test('adds a folder', () => {
    const { result } = renderHook(() => useFolderStore());

    let newKey = '';
    act(() => {
      newKey = result.current.addFolder('My Folder');
    });

    expect(result.current.folders).toHaveLength(2);
    expect(result.current.activeFolderKey).toBe(newKey);
    expect(result.current.editingFolderKey).toBe(newKey);
    expect(result.current.folders.find((f) => f.key === newKey)?.label).toBe(
      'My Folder'
    );
  });

  test('sets active folder', () => {
    const { result } = renderHook(() => useFolderStore());

    act(() => {
      result.current.setActiveFolder('default');
    });

    expect(result.current.activeFolderKey).toBe('default');
  });

  test('sets editing folder key', () => {
    const { result } = renderHook(() => useFolderStore());

    act(() => {
      result.current.setEditingFolderKey('default');
    });

    expect(result.current.editingFolderKey).toBe('default');
  });

  test('renames a folder', () => {
    const { result } = renderHook(() => useFolderStore());

    act(() => {
      result.current.renameFolder('default', 'Renamed Folder');
    });

    expect(result.current.folders.find((f) => f.key === 'default')?.label).toBe(
      'Renamed Folder'
    );
    expect(result.current.editingFolderKey).toBeNull();
  });

  test('removes a folder', () => {
    const { result } = renderHook(() => useFolderStore());

    // Добавим папку для удаления
    let folderKey = '';
    act(() => {
      folderKey = result.current.addFolder('ToRemove', 'remove-me');
    });
    expect(result.current.folders.some((f) => f.key === folderKey)).toBe(true);

    act(() => {
      result.current.removeFolder(folderKey);
    });

    expect(result.current.folders.some((f) => f.key === folderKey)).toBe(false);
    // Если удалена активная папка, активная должна стать default
    expect(result.current.activeFolderKey).toBe('default');
  });

  test('moves a book to a folder', () => {
    const { result } = renderHook(() => useFolderStore());

    // Добавим новую папку
    let newFolderKey = '';
    act(() => {
      newFolderKey = result.current.addFolder('TargetFolder');
    });

    // Переместим книгу в новую папку
    act(() => {
      result.current.moveBookToFolder('book-1', newFolderKey);
    });

    // Книга должна быть только в целевой папке
    expect(
      result.current.folders.find((f) => f.key === newFolderKey)?.bookIds
    ).toContain('book-1');
    // В остальных папках книги не должно быть
    result.current.folders
      .filter((f) => f.key !== newFolderKey)
      .forEach((f) => {
        expect(f.bookIds).not.toContain('book-1');
      });
  });
});
