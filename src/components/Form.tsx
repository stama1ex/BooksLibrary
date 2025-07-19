import MyInput from './../UI/MyInput';
import { MyButton } from './../UI/MyButton';
import type { BookFormData } from '../types';
import clsx from 'clsx';
import { useBookStore } from '../store/bookStore';

interface FormProps {
  formData: BookFormData;
  setFormData: (data: BookFormData) => void;
  onAddBook: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ formData, setFormData, onAddBook }) => {
  const isLoading = useBookStore((s) => s.isLoading);
  const fetchAndAddRandomBook = useBookStore((s) => s.fetchAndAddRandomBook);

  return (
    <form
      onSubmit={onAddBook}
      className="flex flex-col w-full md:w-auto p-8 bg-gray-700 rounded-2xl mb-auto shadow-2xl"
    >
      <h1 className="text-white text-2xl font-bold text-center">
        Add a New Book
      </h1>
      <MyInput
        placeholder="Title..."
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        label={
          <>
            Enter the title <span className="text-red-500">*</span>
          </>
        }
      />
      <MyInput
        placeholder="Author..."
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        label={
          <>
            Enter the author <span className="text-red-500">*</span>
          </>
        }
      />
      <MyButton type="submit" className="!justify-center m-4 shadow-2xl">
        Add book
      </MyButton>
      <hr className="mb-4 border-gray-600" />

      <MyButton
        type="button"
        onClick={() =>
          fetchAndAddRandomBook('https://apiforbookslibrary.onrender.com/book')
        }
        disabled={isLoading}
        className={clsx(
          'justify-center shadow-2xl flex items-center gap-2 mx-4',
          isLoading &&
            'opacity-50 cursor-not-allowed pointer-events-none hover:bg-inherit'
        )}
      >
        {isLoading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3.536-3.536L12 0v4a8 8 0 01-8 8z"
            ></path>
          </svg>
        )}
        {isLoading ? 'Loading...' : 'Add random via API'}
      </MyButton>
    </form>
  );
};

export default Form;
