'use client';

import { House } from '@/types/house';
import HouseTable from '../HouseTable/HouseTable';
import HouseTableGuide from '../HouseTableGuide/HouseTableGuide';
import { useHouseTableGuide } from './useHouseTableGuide';

interface Props {
  houseList: House[];
}

const HouseTableArea = (props: Props) => {
  const { houseList } = props;

  const { isShown, isFading, show, hide } = useHouseTableGuide();

  return (
    <>
      <HouseTable houseList={houseList} onView={show} />
      <HouseTableGuide isShown={isShown} isFading={isFading} onFadeOut={hide} />
    </>
  );
};

export default HouseTableArea;
