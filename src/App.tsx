import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './UI/Header';
import Form from './components/Form';
import Filters from './components/Filters';
import BookList from './components/BookList';
import TrashDrawer from './components/TrashDrawer';
import { useState } from 'react';
import MyButton from './UI/MyButton';
import ThemeToggleButton from './UI/ThemeToggleButton';
import MyTabs from './components/MyTabs';

function App() {
  const [openTrash, setOpenTrash] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      <Header />
      <ToastContainer />
      <ThemeToggleButton darkMode={darkMode} setDarkMode={setDarkMode} />
      <TrashDrawer open={openTrash} onClose={() => setOpenTrash(false)} />
      <div className="flex flex-row flex-wrap items-center justify-center w-full md:p-12 p-4 gap-4 md:gap-8 rounded-2xl md:w-full max-w-full mx-auto">
        <div className="flex flex-col gap-4 w-full md:w-auto mb-0 md:mb-auto">
          <Form />
          <div className="flex justify-center w-full rounded-2xl">
            <MyButton
              id="trash-btn"
              onClick={() => setOpenTrash(true)}
              className="flex items-center !h-fit !w-full !p-2 justify-center shadow-2xl dark:hover:!text-red-400 hover:text-red-900 !border-none"
            >
              <h2 className="group-hover:!text-red-600 transition-colors">
                Trash Bin
              </h2>
              <DeleteOutlined
                style={{ fontSize: 28 }}
                className="group-hover:!text-red-600 transition-colors"
              />
            </MyButton>
          </div>
        </div>

        <div className="flex flex-col w-full md:max-w-[50%] gap-4 items-center justify-center mb-auto">
          <Filters />
          <MyTabs />
          <BookList />
        </div>
      </div>
    </>
  );
}

export default App;
