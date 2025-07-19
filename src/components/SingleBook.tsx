import { StarOutlined, StarFilled, DeleteOutlined } from '@ant-design/icons';
import { highlightMatch } from '../utils/highlightMatch';
import type { Book, BookFormData } from '../types';
import { useBookStore } from '../store/bookStore';

interface SingleBookProps {
  filterData: BookFormData;
  book: Book;
  isDragging?: boolean;
  filterMode?: 'split' | 'combined';
  combinedFilter?: string;
}

const SingleBook: React.FC<SingleBookProps> = ({
  filterData,
  book,
  isDragging = false,
  filterMode,
  combinedFilter,
}) => {
  const deleteBook = useBookStore((s) => s.deleteBook);
  const toggleFavorite = useBookStore((s) => s.toggleFavorite);
  return (
    <div
      className={`flex justify-between bg-gray-600 p-2 text-white border border-gray-500 rounded-sm transition-transform duration-200 ${
        isDragging ? 'scale-105 shadow-lg' : ''
      }`}
    >
      <div className="flex flex-col break-normal">
        <span className="font-semibold ml-2">
          {filterMode === 'combined'
            ? highlightMatch(book.title, combinedFilter || '')
            : highlightMatch(book.title, filterData.title)}
        </span>
        <span className="text-sm text-gray-300 ml-2">
          {filterMode === 'combined'
            ? highlightMatch(book.author, combinedFilter || '')
            : highlightMatch(book.author, filterData.author)}
        </span>
      </div>
      <div className="flex flex-row gap-4 shrink-0">
        {book.isFavorite ? (
          <StarFilled
            onClick={() => toggleFavorite(book.id)}
            className="text-2xl select-none ml-4 transform transition-transform duration-200 hover:scale-125 origin-center active:scale-90"
          />
        ) : (
          <StarOutlined
            onClick={() => toggleFavorite(book.id)}
            className="text-2xl select-none ml-4 transform transition-transform duration-200 hover:scale-125 origin-center active:scale-90"
          />
        )}
        <span
          onClick={() => deleteBook(book.id)}
          className="text-red-500 text-2xl cursor-pointer select-none mr-2 my-auto transform transition-transform duration-200 hover:scale-125 origin-center active:scale-90"
        >
          <DeleteOutlined />
        </span>
      </div>
    </div>
  );
};

export default SingleBook;
