import { Switch } from '@headlessui/react';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import MyInput from './../UI/MyInput';
import { MyButton } from './../UI/MyButton';
import type { BookFormData } from '../types';

interface FiltersProps {
  filterData: BookFormData;
  setFilterData: (data: BookFormData) => void;
  onlyFavorite: boolean;
  setOnlyFavorite: (flag: boolean) => void;
  filterMode: 'split' | 'combined';
  setFilterMode: (mode: 'split' | 'combined') => void;
  combinedFilter: string;
  setCombinedFilter: (val: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  filterData,
  setFilterData,
  onlyFavorite,
  setOnlyFavorite,
  filterMode,
  setFilterMode,
  combinedFilter,
  setCombinedFilter,
}) => {
  const resetFilters = () => {
    setFilterData({ title: '', author: '' });
    setOnlyFavorite(false);
    setCombinedFilter('');
  };
  //
  const items: MenuProps['items'] = [
    {
      key: 'combined',
      label: 'Combined Filter (Title + Author)',
      icon: <FilterOutlined />,
    },
    {
      key: 'split',
      label: 'Split Filter (Title & Author)',
      icon: <FilterOutlined />,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setFilterMode(e.key as 'split' | 'combined');
  };
  //

  return (
    <div className="flex flex-col w-full p-4 bg-gray-700 rounded-2xl shadow-2xl">
      <h1 className="text-white text-2xl text-center font-bold mb-4">
        Filters
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-between ">
        <Space wrap>
          <Dropdown menu={{ items, onClick: handleMenuClick }}>
            <Button className="!bg-gray-800 !text-white !border-none !hover:bg-gray-600">
              <Space>
                {filterMode === 'split' ? 'Split Filter' : 'Combined Filter'}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Space>
        {filterMode === 'combined' ? (
          <MyInput
            placeholder="Search title or author..."
            value={combinedFilter}
            onChange={(e) => setCombinedFilter(e.target.value)}
          />
        ) : (
          <>
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
          </>
        )}
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
