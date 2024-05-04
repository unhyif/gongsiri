'use client';

import { tableStyle, thStyle } from './houseTable.css';

import { House } from '@/types/house';
import { HouseTableRow } from './HouseTableRow';
import { sortHouseList } from '@utils/house';
import { useState } from 'react';

interface Props {
  houses: House[];
}

export const HouseTable = (props: Props) => {
  const [houses, setHouses] = useState<House[]>(sortHouseList(props.houses));

  const THEAD_CELLS = ['지역', '이름', '홈페이지', '최근 공지', null, null];

  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          {THEAD_CELLS.map(cell => (
            <th className={thStyle} key={cell}>
              {cell}
            </th>
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
