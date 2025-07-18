import { Switch } from '@headlessui/react';
import MyInput from './../UI/MyInput';
import { MyButton } from './../UI/MyButton';
import type { BookFormData } from '../types';

interface FiltersProps {
  filterData: BookFormData;
  setFilterData: (data: BookFormData) => void;
  onlyFavorite: boolean;
  setOnlyFavorite: (flag: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({
  filterData,
  setFilterData,
  onlyFavorite,
  setOnlyFavorite,
}) => {
  const resetFilters = () => {
    setFilterData({ title: '', author: '' });
    setOnlyFavorite(false);
  };

  return (
    <div className="flex flex-col w-full p-4 bg-gray-700 rounded-2xl shadow-2xl">
      <h1 className="text-white text-2xl text-center font-bold mb-4">
        Filters
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-between ">
        <MyInput
          onChange={(e) =>
            setFilterData({ ...filterData, title: e.target.value })
          }
          value={filterData.title}
          placeholder="Filter by title..."
        />
        <MyInput
          onChange={(e) =>
            setFilterData({ ...filterData, author: e.target.value })
          }
          value={filterData.author}
          placeholder="Filter by author..."
        />

        <div className="flex items-center gap-3 select-none">
          <label
            htmlFor="switch"
            className="text-white whitespace-nowrap min-w-fit text-sm/6 font-semibold cursor-pointer"
          >
            Only Favorite
          </label>
          <Switch
            id="switch"
            checked={onlyFavorite}
            onChange={() => setOnlyFavorite(!onlyFavorite)}
            className={`relative inline-flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out
              ${onlyFavorite ? 'bg-gray-800' : 'bg-white/10'}
              focus:outline-none outline-white`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out
                ${onlyFavorite ? 'translate-x-7' : 'translate-x-0'}`}
            />
          </Switch>
        </div>

        <MyButton
          onClick={resetFilters}
          className="m-4 min-w-26 !justify-center shadow-2xl select-none"
        >
          Reset filters
        </MyButton>
      </div>
    </div>
  );
};

export default Filters;
