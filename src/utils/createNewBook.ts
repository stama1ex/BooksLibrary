import type { BookFormData } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createNewBook = (book: BookFormData) => {
  return {
    title: book.title,
    author: book.author,
    id: uuidv4(),
    isFavorite: false,
  };
};
