import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import SingleBook from './SingleBook';
import { useBookStore } from '../store/bookStore';
import { useFilteredBooks } from '../utils/hooks/useFilteredBooks';

interface BookListProps {
  folderId: string;
}

const BookList: React.FC<BookListProps> = ({ folderId }) => {
  const setBooks = useBookStore((s) => s.setBooks);
  const filteredBooks = useFilteredBooks();

  const finalBooks = filteredBooks.filter((book) => book.folderId === folderId);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // Копируем все книги
    const allBooks = [...useBookStore.getState().books];

    // Находим индексы книг этой папки в общем массиве
    const folderBookIndexes = allBooks
      .map((book, idx) => (book.folderId === folderId ? idx : -1))
      .filter((idx) => idx !== -1);

    // Получаем книги этой папки в текущем порядке
    const folderBooks = folderBookIndexes.map((idx) => allBooks[idx]);

    // Меняем порядок внутри папки
    const [removed] = folderBooks.splice(result.source.index, 1);
    folderBooks.splice(result.destination.index, 0, removed);

    // Обновляем общий массив книг: только книги этой папки меняют порядок
    folderBookIndexes.forEach((bookIdx, i) => {
      allBooks[bookIdx] = folderBooks[i];
    });

    setBooks(allBooks);
  };

  return finalBooks.length > 0 ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="books-droppable">
        {(provided) => (
          <ul
            className="flex flex-col gap-1"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {finalBooks.map((book, index) => (
              <Draggable key={book.id} draggableId={book.id} index={index}>
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
                    <SingleBook book={book} isDragging={snapshot.isDragging} />
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
  );
};

export default BookList;
