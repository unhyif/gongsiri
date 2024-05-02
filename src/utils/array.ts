import { House } from '../types';

export const sortHouseList = (houses: House[]) =>
  houses.sort((a, b) => {
    const areaComparison = a.area.localeCompare(b.area);
    if (areaComparison !== 0) {
      return areaComparison;
    }
    return a.name.localeCompare(b.name);
  });
