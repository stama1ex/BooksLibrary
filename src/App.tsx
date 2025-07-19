import Header from './UI/Header';
import { ToastContainer } from 'react-toastify';
import Form from './components/Form';
import Filters from './components/Filters';
import BookList from './components/BookList';

function App() {
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
