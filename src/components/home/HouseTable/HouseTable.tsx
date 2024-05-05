'use client';

import { tableStyle, thStyle } from './HouseTable.css';

import { House } from '@/types/house';
import HouseTableRow from './HouseTableRow';
import { sortHouseList } from '@utils/house';
import { useState } from 'react';

interface Props {
  houses: House[];
}

const HouseTable = (props: Props) => {
  const [houses, setHouses] = useState<House[]>(sortHouseList(props.houses));

  const TH_CELLS = ['지역', '이름', '홈페이지', '최근 공지', '', ''];

  return (
    <table className={tableStyle}>
      <thead>
        <tr>
          {TH_CELLS.map((cell, index) => (
            <th className={thStyle} key={cell + index}>
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

export default HouseTable;
