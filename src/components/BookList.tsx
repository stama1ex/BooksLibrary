import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import SingleBook from './SingleBook';
import type { Book, BookFormData } from '../types';
import { useBookStore } from '../store/bookStore';

interface BookListProps {
  filteredBooks: Book[];
  filterData: BookFormData;
  filterMode: 'split' | 'combined';
  combinedFilter: string;
}

const BookList: React.FC<BookListProps> = ({
  filteredBooks,
  filterData,
  filterMode,
  combinedFilter,
}) => {
  const setBooks = useBookStore((s) => s.setBooks);
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedBooks = Array.from(filteredBooks);
    const [movedBook] = reorderedBooks.splice(result.source.index, 1);
    reorderedBooks.splice(result.destination.index, 0, movedBook);

    setBooks(reorderedBooks);
  };

  return (
    <div className="flex flex-col p-8 bg-gray-700 rounded-2xl w-full shadow-2xl break-all">
      <h1 className="text-white text-2xl font-bold text-center mb-8">
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
                          book={book}
                          isDragging={snapshot.isDragging}
                          filterMode={filterMode}
                          combinedFilter={combinedFilter}
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
