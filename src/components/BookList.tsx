import { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import SingleBook from './SingleBook';
import { useBookStore } from '../store/bookStore';
import { useFilteredBooks } from '../utils/hooks/useFilteredBooks';
import type { Folder, Book } from '../types';

const BookList: React.FC = () => {
  const setBooks = useBookStore((s) => s.setBooks);
  const filteredBooks = useFilteredBooks();
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedBooks = Array.from(filteredBooks);
    const [movedBook] = reorderedBooks.splice(result.source.index, 1);
    reorderedBooks.splice(result.destination.index, 0, movedBook);

    setBooks(reorderedBooks);
  };

  //
  const initialFolders: Folder[] = [
    { key: '1', label: 'Folder 1' },
    { key: '2', label: 'Folder 2' },
  ];

  const initialBooks: Book[] = [];

  const BookListWithFolders: React.FC = () => {
    const [folders, setFolders] = useState<Folder[]>(initialFolders);
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [activeKey, setActiveKey] = useState<string>(initialFolders[0].key);
    const newTabIndex = useRef(0);

    const onChange = (newActiveKey: string) => {
      setActiveKey(newActiveKey);
    };

    const addFolder = () => {
      const newKey = `newFolder${newTabIndex.current++}`;
      setFolders([
        ...folders,
        { key: newKey, label: `Folder ${newTabIndex.current}` },
      ]);
      setActiveKey(newKey);
    };

    const removeFolder = (targetKey: string) => {
      let newActiveKey = activeKey;
      let lastIndex = -1;
      folders.forEach((folder, i) => {
        if (folder.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const newFolders = folders.filter((folder) => folder.key !== targetKey);
      setFolders(newFolders);

      // Переключаемся на другую папку
      if (newFolders.length && newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newFolders[lastIndex].key;
        } else {
          newActiveKey = newFolders[0].key;
        }
      }
      setActiveKey(newActiveKey);

      // По желанию: можно удалить все книги из удаленной папки
      setBooks(books.filter((book) => book.folderId !== targetKey));
    };

    const onEdit = (
      targetKey: React.MouseEvent | React.KeyboardEvent | string,
      action: 'add' | 'remove'
    ) => {
      if (action === 'add') {
        addFolder();
      } else if (typeof targetKey === 'string') {
        removeFolder(targetKey);
      }
    };

    // Формируем табы с содержимым — списком книг по папке
    const items = folders.map((folder) => ({
      key: folder.key,
      label: folder.label,
      children: (
        <ul>
          {books
            .filter((book) => book.folderId === folder.key)
            .map((book) => (
              <li key={book.id}>
                {book.title} — {book.author}
              </li>
            ))}
        </ul>
      ),
    }));
    //
    return (
      <div className="flex flex-col p-8 bg-gray-200 dark:bg-gray-700 transition-colors duration-200 rounded-2xl w-full shadow-2xl break-all">
        <h1 className="text-gray-800 dark:text-white text-2xl font-bold text-center mb-8">
          Book List
        </h1>
        {filteredBooks.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="books-droppable">
              {(provided) => (
                <ul
                  className="flex flex-col gap-1"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredBooks.map((book, index) => (
                    <Draggable
                      key={book.id}
                      draggableId={book.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`select-none ${
                            snapshot.isDragging ? 'bg-gray-500 shadow-lg' : ''
                          }`}
                          style={{
                            userSelect: 'none',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <SingleBook
                            book={book}
                            isDragging={snapshot.isDragging}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <h2 className="text-gray-400 dark:text-gray-300 text-xl font-normal text-center">
            It is empty now
          </h2>
        )}
      </div>
    );
  };
};
export default BookList;
