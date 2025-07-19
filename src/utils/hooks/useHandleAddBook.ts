import { useCallback } from 'react';
import { useFilterStore } from '../../store/filterStore';
import { useBookStore } from '../../store/bookStore';
import { trimForm, clearForm, isValidForm } from '../formActions';
import { toast } from 'react-toastify';

export const useAddBookHandler = () => {
  const formData = useFilterStore((s) => s.formData);
  const setFormData = useFilterStore((s) => s.setFormData);
  const addBook = useBookStore((s) => s.addBook);

  const handleAddBook = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmed = trimForm(formData);

      if (isValidForm(trimmed)) {
        addBook(trimmed);
        setFormData(clearForm());
      } else {
        toast.info('Please fill in all fields');
      }
    },
    [formData, addBook, setFormData]
  );

  return handleAddBook;
};
