import { StarOutlined, StarFilled, DeleteOutlined } from '@ant-design/icons';
import { highlightMatch } from '../utils/highlightMatch';
import { useBookStore } from '../store/bookStore';
import { useFilterStore } from '../store/filterStore';
import type { Book } from '../types';
import MyModal from '../UI/MyModal';
import { useState } from 'react';

interface SingleBookProps {
  isDragging?: boolean;
  book: Book;
}

const SingleBook: React.FC<SingleBookProps> = ({
  isDragging = false,
  book,
}) => {
  const deleteBook = useBookStore((s) => s.deleteBook);
  const toggleFavorite = useBookStore((s) => s.toggleFavorite);
  const filterData = useFilterStore((s) => s.filterData);
  const filterMode = useFilterStore((s) => s.filterMode);
  const combinedFilter = useFilterStore((s) => s.combinedFilter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDeleteClick = () => {
    if (book.isFavorite) {
      setIsModalOpen(true);
    } else {
      deleteBook(book.id);
    }
  };

  const handleConfirmDelete = () => {
    deleteBook(book.id);
    setIsModalOpen(false);
  };
  return (
    <div
      className={`flex justify-between bg-gray-100 dark:bg-gray-600 p-2 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-500 rounded-sm transition-colors duration-200 ${
        isDragging ? 'scale-105 shadow-lg' : ''
      }`}
    >
      <div className="flex flex-col break-all">
        <span className="font-semibold ml-2">
          {filterMode === 'combined'
            ? highlightMatch(book.title, combinedFilter || '')
            : highlightMatch(book.title, filterData.title)}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-300 ml-2">
          {filterMode === 'combined'
            ? highlightMatch(book.author, combinedFilter || '')
            : highlightMatch(book.author, filterData.author)}
        </span>
      </div>
      <div className="flex flex-row gap-4 shrink-0">
        {book.isFavorite ? (
          <StarFilled
            onClick={() => toggleFavorite(book.id)}
            className="text-2xl select-none ml-4 transform transition-transform duration-200 hover:scale-125 origin-center active:scale-90 !text-yellow-400"
          />
        ) : (
          <StarOutlined
            onClick={() => toggleFavorite(book.id)}
            className="text-2xl select-none ml-4 transform transition-transform duration-200 hover:scale-125 origin-center active:scale-90 text-gray-400"
          />
        )}
        <span
          onClick={handleDeleteClick}
          className="dark:md:text-white md:text-gray-800  md:hover:text-red-500 text-red-500 text-2xl cursor-pointer select-none mr-2 my-auto transform transition-all duration-200 hover:scale-125 origin-center active:scale-90"
        >
          <DeleteOutlined />
        </span>
        <MyModal
          open={isModalOpen}
          onOk={handleConfirmDelete}
          onCancel={() => setIsModalOpen(false)}
          title="Move book to trash?"
          content="This book is in your favorites. Are you sure you want to remove it?"
        />
      </div>
    </div>
  );
};

export default SingleBook;
