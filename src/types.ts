export interface Book {
  title: string;
  author: string;
  id: string;
  isFavorite: boolean;
  folderId: string;
}
export interface BookFormData {
  title: string;
  author: string;
}
export interface Folder {
  key: string;
  label: string;
}
