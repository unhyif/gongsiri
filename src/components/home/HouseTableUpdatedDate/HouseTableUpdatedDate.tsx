'use client';

import { updatedDateStyle } from './HouseTableUpdatedDate.css';

interface Props {
  updatedAt: number;
}

const HouseTableUpdatedDate = (props: Props) => {
  const { updatedAt } = props;

  const updatedDate = new Intl.DateTimeFormat('ko', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(updatedAt);

  return (
    <p className={updatedDateStyle} suppressHydrationWarning>
      최근 업데이트: {updatedDate}
    </p>
  );
};

export default HouseTableUpdatedDate;
