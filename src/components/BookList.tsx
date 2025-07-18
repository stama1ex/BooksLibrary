import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import SingleBook from './SingleBook';
import type { Book, BookFormData } from '../types';

interface BookListProps {
  filterData: BookFormData;
  books: Book[];
  setBooks: (books: Book[]) => void;
}

const BookList: React.FC<BookListProps> = ({ books, setBooks, filterData }) => {
  const handleDelete = (id: string) => {
    const updated = books.filter((book) => book.id !== id);
    setBooks(updated);
  };

  const handleToggleFavorite = (id: string) => {
    const updated = books.map((book) =>
      book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
    );
    setBooks(updated);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedBooks = Array.from(books);
    const [movedBook] = reorderedBooks.splice(result.source.index, 1);
    reorderedBooks.splice(result.destination.index, 0, movedBook);

    setBooks(reorderedBooks);
  };

  return (
    <div className="flex flex-col p-8 bg-gray-700 rounded-2xl w-full shadow-2xl break-all">
      <h1 className="text-white text-2xl font-bold text-center mb-8">
        Book List
      </h1>
      {books.length > 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="books-droppable">
            {(provided) => (
              <ul
                className="flex flex-col gap-1"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {books.map((book, index) => (
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
                        <SingleBook
                          filterData={filterData}
                          toggleFavorite={handleToggleFavorite}
                          deleteBook={handleDelete}
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
        <h2 className="text-gray-400 text-xl font-normal text-center">
          It is empty now
        </h2>
      )}
    </div>
  );
};

export default BookList;
