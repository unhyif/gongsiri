import { tableStyle, thStyle } from './HouseTable.css';

import { House } from '@/types/house';
import HouseTableRow from './HouseTableRow';
import { useEffect } from 'react';
import { useHouses } from './useHouses';
import { useInView } from 'react-intersection-observer';

interface Props {
  houseList: House[];
  onView: () => void;
  isMobile: boolean;
}

const HouseTable = (props: Props) => {
  const { houseList, onView, isMobile } = props;

  const { houses, handleHouseFavorite } = useHouses({ houseList });

  const { ref, inView } = useInView({ threshold: 0.01 });

  const TH_CELLS = ['지역', '이름', '최근 공지사항', '홈페이지', '즐겨찾기'];

  useEffect(() => {
    if (!isMobile) return;
    if (!inView) return;
    onView();
  }, [inView]);

  return (
    <table ref={ref} className={tableStyle}>
      <thead>
        <tr>
          {TH_CELLS.map(cell => {
            const isLatestAnnouncement = cell === TH_CELLS[2];
            return (
              <th
                key={cell}
                className={thStyle}
                colSpan={isLatestAnnouncement ? 2 : undefined}
              >
                {cell}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {houses.map(house => (
          <HouseTableRow
            key={house.id}
            house={house}
            onClickFavorite={handleHouseFavorite}
          />
        ))}
      </tbody>
    </table>
  );
};

export default HouseTable;
