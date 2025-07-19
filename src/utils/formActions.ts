import type { BookFormData } from '../types';

export const trimForm = (data: BookFormData): BookFormData => ({
  title: data.title.trim(),
  author: data.author.trim(),
});

export const clearForm = (): BookFormData => ({
  title: '',
  author: '',
});

export const isValidForm = (data: BookFormData): boolean => {
  return data.title !== '' && data.author !== '';
};
