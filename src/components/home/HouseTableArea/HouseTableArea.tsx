'use client';

import { House } from '@/types/house';
import HouseTable from '../HouseTable/HouseTable';
import HouseTableGuide from '../HouseTableGuide/HouseTableGuide';
import { useHouseTableGuide } from './useHouseTableGuide';

interface Props {
  houseList: House[];
  isMobile: boolean;
}

const HouseTableArea = (props: Props) => {
  const { houseList, isMobile } = props;

  const { isShown, isFading, show, hide } = useHouseTableGuide();

  return (
    <>
      <HouseTable houseList={houseList} onView={show} isMobile={isMobile} />
      <HouseTableGuide isShown={isShown} isFading={isFading} onFadeOut={hide} />
    </>
  );
};

export default HouseTableArea;
