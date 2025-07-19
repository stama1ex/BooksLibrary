import { useState, useEffect, useRef } from 'react';
import Header from './UI/Header';
import { ToastContainer, toast } from 'react-toastify';
import Form from './components/Form';
import Filters from './components/Filters';
import BookList from './components/BookList';
import type { BookFormData } from './types';
import { useBookStore } from './store/bookStore';
import { clearForm, trimForm, isValidForm } from './utils/formActions';

function App() {
  const books = useBookStore((s) => s.books);
  const addBook = useBookStore((s) => s.addBook);
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
  });
  const [filterData, setFilterData] = useState<BookFormData>({
    title: '',
    author: '',
  });

  const [filterMode, setFilterMode] = useState<'split' | 'combined'>(() => {
    const storedFilterMode = localStorage.getItem('filterMode');
    return storedFilterMode ? JSON.parse(storedFilterMode) : 'split';
  });

  const [combinedFilter, setCombinedFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('filterMode', JSON.stringify(filterMode));
  }, [filterMode]);

  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      setFilterData({ title: '', author: '' });
      setCombinedFilter('');
    } else {
      hasMounted.current = true;
    }
  }, [filterMode]);

  const getFilteredBooks = () => {
    return books.filter((book) => {
      const matchesFavorite = onlyFavorite ? book.isFavorite === true : true;

      if (filterMode === 'combined') {
        const combined = `${book.title} ${book.author}`.toLowerCase();
        return (
          combined.includes(combinedFilter.toLowerCase()) && matchesFavorite
        );
      }

      const matchesTitle = book.title
        .toLowerCase()
        .includes(filterData.title.toLowerCase());
      const matchesAuthor = book.author
        .toLowerCase()
        .includes(filterData.author.toLowerCase());

      return matchesTitle && matchesAuthor && matchesFavorite;
    });
  };

  const handleAddBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = trimForm(formData);

    if (isValidForm(trimmed)) {
      addBook(trimmed);
      setFormData(clearForm());
    } else {
      toast.info('Please fill in all fields');
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="flex flex-row flex-wrap items-center justify-center w-full md:p-12 p-4 gap-8 rounded-2xl md:w-full max-w-full mx-auto">
        <Form
          onAddBook={handleAddBook}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="flex flex-col w-full md:w-auto gap-8 items-center justify-center mb-auto">
          <Filters
            filterData={filterData}
            setFilterData={setFilterData}
            onlyFavorite={onlyFavorite}
            setOnlyFavorite={setOnlyFavorite}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            combinedFilter={combinedFilter}
            setCombinedFilter={setCombinedFilter}
          />
          <BookList
            filterData={filterData}
            filteredBooks={getFilteredBooks()}
            filterMode={filterMode}
            combinedFilter={combinedFilter}
          />
        </div>
      </div>
    </>
  );
}

export default App;
