import { House, HouseCell } from '@/types/house';
import { useEffect, useState } from 'react';

const FAVORITE_HOUSE_IDS_KEY = 'favoriteHouseIds';

export const useHouses = (params: { houseList: House[] }) => {
  const { houseList } = params;

  const [houses, setHouses] = useState<HouseCell[]>(
    houseList.map(house => ({ ...house, isFavorite: false }))
  );

  const favoriteHouseIds = JSON.parse(
    localStorage.getItem(FAVORITE_HOUSE_IDS_KEY) ?? '[]'
  );

  const saveFavoriteHouseId = (houseId: number) =>
    localStorage.setItem(
      FAVORITE_HOUSE_IDS_KEY,
      JSON.stringify([...favoriteHouseIds, houseId])
    );

  const toggleFavorite = (houseId: number) => {
    saveFavoriteHouseId(houseId);

    setHouses(prev =>
      prev.map(house =>
        house.id === houseId
          ? { ...house, isFavorite: !house.isFavorite }
          : house
      )
    );
  };

  useEffect(() => {
    setHouses(prev =>
      prev.map(house => ({
        ...house,
        isFavorite: favoriteHouseIds.includes(house.id),
      }))
    );
  }, []);

  return { houses, toggleFavorite };
};
