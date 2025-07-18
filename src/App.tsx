import { useState, useEffect } from 'react';
import Header from './UI/Header';
import { ToastContainer, toast } from 'react-toastify';
import Form from './components/Form';
import Filters from './components/Filters';
import BookList from './components/BookList';
import type { Book, BookFormData } from './types';
import { createNewBook } from './utils/createNewBook';

function App() {
  const [onlyFavorite, setOnlyFavorite] = useState(false);
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
  });
  const [filterData, setFilterData] = useState<BookFormData>({
    title: '',
    author: '',
  });
  const [books, setBooks] = useState<Book[]>(() => {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const getFilteredBooks = () => {
    return books.filter((book) => {
      const matchesTitle = book.title
        .toLowerCase()
        .includes(filterData.title.toLowerCase());
      const matchesAuthor = book.author
        .toLowerCase()
        .includes(filterData.author.toLowerCase());
      const matchesFavorite = onlyFavorite ? book.isFavorite === true : true;

      return matchesTitle && matchesAuthor && matchesFavorite;
    });
  };

  const trimForm = (data: BookFormData): BookFormData => ({
    title: data.title.trim(),
    author: data.author.trim(),
  });

  const clearForm = (): BookFormData => ({
    title: '',
    author: '',
  });

  const isValidForm = (data: BookFormData): boolean => {
    return data.title !== '' && data.author !== '';
  };

  const handleAddBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = trimForm(formData);

    if (isValidForm(trimmed)) {
      setBooks((prev) => [...prev, createNewBook(trimmed)]);
      setFormData(clearForm());
    } else {
      toast.info('Please fill in all fields');
    }
  };
  const handleAddRandomBook = (book: BookFormData) => {
    const trimmed = trimForm(book);

    if (isValidForm(trimmed)) {
      setBooks((prev) => [...prev, createNewBook(trimmed)]);
    } else {
      toast.error('Random book has invalid data');
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="flex flex-row flex-wrap items-center justify-center w-full md:p-12 p-8 gap-8 rounded-2xl md:w-full max-w-[90%] mx-auto">
        <Form
          formData={formData}
          setFormData={setFormData}
          onAddBook={handleAddBook}
          onAddRandomBook={handleAddRandomBook}
        />
        <div className="flex flex-col w-full md:w-auto gap-8 items-center justify-center mb-auto">
          <Filters
            filterData={filterData}
            setFilterData={setFilterData}
            onlyFavorite={onlyFavorite}
            setOnlyFavorite={setOnlyFavorite}
          />
          <BookList
            filterData={filterData}
            books={getFilteredBooks()}
            setBooks={setBooks}
          />
        </div>
      </div>
    </>
  );
}

export default App;
