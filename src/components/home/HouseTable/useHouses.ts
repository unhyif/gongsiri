import { House, HouseCell } from '@/types/house';
import { useEffect, useState } from 'react';

const FAVORITE_HOUSE_IDS_KEY = 'favoriteHouseIds';

export const useHouses = (params: { houseList: House[] }) => {
  const { houseList } = params;

  const [houses, setHouses] = useState<HouseCell[]>(
    houseList.map(house => ({ ...house, isFavorite: false }))
  );

  const toggleFavorite = (houseId: number) =>
    setHouses(prev =>
      prev.map(house =>
        house.id === houseId
          ? { ...house, isFavorite: !house.isFavorite }
          : house
      )
    );

  useEffect(() => {
    const favoriteHouseIds = JSON.parse(
      localStorage.getItem(FAVORITE_HOUSE_IDS_KEY) ?? '[]'
    );

    setHouses(prev =>
      prev.map(house => ({
        ...house,
        isFavorite: favoriteHouseIds.includes(house.id),
      }))
    );
  }, []);

  return { houses, toggleFavorite };
};
