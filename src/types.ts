export interface Book {
  title: string;
  author: string;
  id: string;
  isFavorite: boolean;
  folderId: string | null;
}
export interface BookFormData {
  title: string;
  author: string;
  folderId?: string;
}

export interface TrashedBook extends Book {
  deletedFromFolderLabel?: string;
  deletedAt: string; // строка в формате dayjs
}
