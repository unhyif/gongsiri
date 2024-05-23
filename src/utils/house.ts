import { House, HouseCell } from '@/types/house';

export const sortHousesByAreaAndName = (houses: House[]) =>
  houses.sort((a, b) => {
    const areaComparison = a.area.localeCompare(b.area);
    if (areaComparison !== 0) {
      return areaComparison;
    }
    return a.name.localeCompare(b.name);
  });

export const sortHousesByIsFavorite = (houses: HouseCell[]) =>
  houses.sort((a, b) =>
    a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
  );
