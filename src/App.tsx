import { useState } from 'react';
import Header from './UI/Header';
import { ToastContainer, toast } from 'react-toastify';
import Form from './components/Form';
import Filters from './components/Filters';
import BookList from './components/BookList';
import type { BookFormData } from './types';
import { useBookStore } from './store/bookStore';
import { clearForm, trimForm, isValidForm } from './utils/formActions';

function App() {
  const addBook = useBookStore((s) => s.addBook);

  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
  });

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
          <Filters />
          <BookList />
        </div>
      </div>
    </>
  );
}

export default App;
