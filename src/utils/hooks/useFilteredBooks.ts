import { useBookStore } from '../../store/bookStore';
import { useFilterStore } from '../../store/filterStore';
import type { Book } from '../../types';

export const useFilteredBooks = (): Book[] => {
  const books = useBookStore((s) => s.books);
  const onlyFavorite = useFilterStore((s) => s.onlyFavorite);
  const filterMode = useFilterStore((s) => s.filterMode);
  const filterData = useFilterStore((s) => s.filterData);
  const combinedFilter = useFilterStore((s) => s.combinedFilter);

  return books.filter((book) => {
    const matchesFavorite = onlyFavorite ? book.isFavorite === true : true;

    if (filterMode === 'combined') {
      const combined = `${book.title} ${book.author}`.toLowerCase();
      return combined.includes(combinedFilter.toLowerCase()) && matchesFavorite;
    }

    const matchesTitle = book.title
      .toLowerCase()
      .includes(filterData.title.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(filterData.author.toLowerCase());

    return matchesTitle && matchesAuthor && matchesFavorite;
  });
};
