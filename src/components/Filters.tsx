import { Switch } from '@headlessui/react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';
import MyInput from './../UI/MyInput';
import { MyButton } from './../UI/MyButton';
import { useFilterStore } from '../store/filterStore';

const Filters: React.FC = () => {
  const filterData = useFilterStore((s) => s.filterData);
  const setFilterData = useFilterStore((s) => s.setFilterData);
  const onlyFavorite = useFilterStore((s) => s.onlyFavorite);
  const setOnlyFavorite = useFilterStore((s) => s.setOnlyFavorite);
  const filterMode = useFilterStore((s) => s.filterMode);
  const setFilterMode = useFilterStore((s) => s.setFilterMode);
  const combinedFilter = useFilterStore((s) => s.combinedFilter);
  const setCombinedFilter = useFilterStore((s) => s.setCombinedFilter);
  const resetFilters = useFilterStore((s) => s.resetFilters);

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
      <div className="flex flex-row justify-center items-center gap-4 mb-4">
        <h1 className="text-white text-2xl text-center font-bold ">Filters</h1>
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
      </div>

      <div className="flex flex-col items-center justify-center flex-wrap">
        {filterMode === 'combined' ? (
          <MyInput
            placeholder="Search title or author..."
            value={combinedFilter}
            onChange={(e) => setCombinedFilter(e.target.value)}
          />
        ) : (
          <div className="flex flex-col md:flex-row w-full">
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
          </div>
        )}
        <div className="flex flex-row gap-2 justify-center items-center">
          <div className="flex justify-center items-center p-2 gap-3 select-none">
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
            className="min-w-26 !justify-center shadow-2xl select-none"
          >
            Reset filters
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default Filters;
