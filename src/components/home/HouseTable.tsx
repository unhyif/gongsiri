'use client';

import { House } from '@/types/house';
import { HouseTableRow } from './HouseTableRow';
import { sortHouseList } from '@utils/house';
import { useState } from 'react';

interface Props {
  houses: House[];
}

export const HouseTable = (props: Props) => {
  const [houses, setHouses] = useState<House[]>(sortHouseList(props.houses));

  const THEAD_CELLS = ['지역', '이름', 'Links', '최근 공지'];

  return (
    <table>
      <thead>
        <tr>
          {THEAD_CELLS.map(cell => (
            <th key={cell}>{cell}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {houses.map(house => (
          <HouseTableRow key={house.id} house={house} />
        ))}
      </tbody>
    </table>
  );
};
