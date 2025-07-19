import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './UI/Header';
import Form from './components/Form';
import Filters from './components/Filters';
import BookList from './components/BookList';

function App() {
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await axios.get('https://apiforbookslibrary.onrender.com/book');
        console.log('Server is awake!');
      } catch (err) {
        console.warn('Failed to wake server:', err);
      }
    };

    wakeUpServer();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="flex flex-row flex-wrap items-center justify-center w-full md:p-12 p-4 gap-8 rounded-2xl md:w-full max-w-full mx-auto">
        <Form />
        <div className="flex flex-col w-full md:w-auto gap-8 items-center justify-center mb-auto">
          <Filters />
          <BookList />
        </div>
      </div>
    </>
  );
}

export default App;
