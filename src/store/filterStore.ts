import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { BookFormData } from '../types';

type FilterMode = 'split' | 'combined';

interface FilterState {
  onlyFavorite: boolean;
  filterData: BookFormData;
  combinedFilter: string;
  filterMode: FilterMode;

  setOnlyFavorite: (flag: boolean) => void;
  setFilterData: (data: BookFormData) => void;
  setCombinedFilter: (value: string) => void;
  setFilterMode: (mode: FilterMode) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    devtools(
      immer((set) => ({
        onlyFavorite: false,
        filterData: { title: '', author: '' },
        combinedFilter: '',
        filterMode: 'split',

        setOnlyFavorite: (flag) =>
          set((state) => {
            state.onlyFavorite = flag;
          }),

        setFilterData: (data) =>
          set((state) => {
            state.filterData = data;
          }),

        setCombinedFilter: (value) =>
          set((state) => {
            state.combinedFilter = value;
          }),

        setFilterMode: (mode) =>
          set((state) => {
            state.filterMode = mode;
            state.filterData = { title: '', author: '' };
            state.combinedFilter = '';
          }),

        resetFilters: () =>
          set((state) => {
            state.onlyFavorite = false;
            state.filterData = { title: '', author: '' };
            state.combinedFilter = '';
          }),
      }))
    ),
    {
      name: 'filter-store',
      version: 1,
      partialize: (state) => ({
        onlyFavorite: state.onlyFavorite,
        filterMode: state.filterMode,
        filterData: state.filterData,
        combinedFilter: state.combinedFilter,
      }),
    }
  )
);
