import type { BookFormData } from '../types';
import { v4 as uuidv4 } from 'uuid';
import type { Book } from '../types';

export const createNewBook = (data: BookFormData): Book => {
  return {
    id: uuidv4(),
    title: data.title,
    author: data.author,
    isFavorite: false,
    folderId: data.folderId || 'default', // добавлено
  };
};
