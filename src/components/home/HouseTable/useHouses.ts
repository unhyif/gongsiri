import { House, HouseCell } from '@/types/house';
import { useEffect, useState } from 'react';

import { sortHousesByIsFavorite } from '@utils/house';

const FAVORITE_HOUSE_IDS_KEY = 'favoriteHouseIds';

export const useHouses = (params: { houseList: House[] }) => {
  const { houseList } = params;

  const [houses, setHouses] = useState<HouseCell[]>(
    houseList.map(house => ({ ...house, isFavorite: false }))
  );

  const getFavoriteHouseIds = () =>
    JSON.parse(
      localStorage.getItem(FAVORITE_HOUSE_IDS_KEY) ?? '[]'
    ) as number[];

  const postHouseFavorite = (params: { houseId: number; to: boolean }) => {
    const { houseId, to } = params;

    const favoriteHouseIds = getFavoriteHouseIds();

    localStorage.setItem(
      FAVORITE_HOUSE_IDS_KEY,
      JSON.stringify(
        to
          ? [...favoriteHouseIds, houseId]
          : favoriteHouseIds.filter(id => id !== houseId)
      )
    );
  };

  const handleHouseFavorite = (params: { houseId: number; to: boolean }) => {
    const { houseId, to } = params;

    postHouseFavorite(params);

    setHouses(prev =>
      prev.map(house =>
        house.id === houseId ? { ...house, isFavorite: to } : house
      )
    );
  };

  useEffect(() => {
    const favoriteHouseIds = getFavoriteHouseIds();
    if (!favoriteHouseIds.length) return;

    setHouses(prev => {
      const housesWithFavoriteData = prev.map(house => ({
        ...house,
        isFavorite: favoriteHouseIds.includes(house.id),
      }));
      return sortHousesByIsFavorite(housesWithFavoriteData);
    });
  }, []);

  return { houses, handleHouseFavorite };
};
