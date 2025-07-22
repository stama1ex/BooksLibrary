// src/__tests__/filterStore.test.ts
import { useFilterStore } from '../store/filterStore';

beforeEach(() => {
  useFilterStore.setState({
    onlyFavorite: false,
    filterData: { title: '', author: '' },
    combinedFilter: '',
    filterMode: 'split',
    formData: { title: '', author: '' },
  });
});

test('sets onlyFavorite flag', () => {
  const state = useFilterStore.getState();
  state.setOnlyFavorite(true);
  expect(useFilterStore.getState().onlyFavorite).toBe(true);
});

test('sets filterData', () => {
  useFilterStore
    .getState()
    .setFilterData({ title: 'Harry', author: 'Rowling' });
  expect(useFilterStore.getState().filterData).toEqual({
    title: 'Harry',
    author: 'Rowling',
  });
});

test('sets combinedFilter', () => {
  useFilterStore.getState().setCombinedFilter('search value');
  expect(useFilterStore.getState().combinedFilter).toBe('search value');
});

test('resets filters', () => {
  const state = useFilterStore.getState();
  state.setOnlyFavorite(true);
  state.setFilterData({ title: 'a', author: 'b' });
  state.setCombinedFilter('combined');

  state.resetFilters();

  expect(state.onlyFavorite).toBe(false);
  expect(state.filterData).toEqual({ title: '', author: '' });
  expect(state.combinedFilter).toBe('');
});
