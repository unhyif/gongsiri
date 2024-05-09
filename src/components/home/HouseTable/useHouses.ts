import { House, HouseCell } from '@/types/house';
import { useEffect, useState } from 'react';

import { LOCAL_STORAGE_KEYS } from '@constants/localStorageKeys';
import { sortHousesByIsFavorite } from '@utils/house';

export const useHouses = (params: { houseList: House[] }) => {
  const { houseList } = params;

  const [houses, setHouses] = useState<HouseCell[]>(
    houseList.map(house => ({ ...house, isFavorite: false }))
  );

  const getFavoriteHouseIds = () =>
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.favoriteHouseIds) ?? '[]'
    ) as number[];

  const postHouseFavorite = (params: { houseId: number; to: boolean }) => {
    const { houseId, to } = params;

    const favoriteHouseIds = getFavoriteHouseIds();

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.favoriteHouseIds,
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
