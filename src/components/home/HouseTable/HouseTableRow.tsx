import {
  backgroundColor,
  favoriteBtnStyle,
  homePageTdStyle,
  linkStyle,
  tdStyle,
  trStyle,
} from './houseTableRow.css';

import { HouseCell } from '@/types/house';
import StarFilled from '@assets/svgs/star_filled.svg';
import StarUnfilled from '@assets/svgs/star_unfilled.svg';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface Props {
  house: HouseCell;
  onClickFavorite: (params: { houseId: number; to: boolean }) => void;
}

const HouseTableRow = (props: Props) => {
  const { house, onClickFavorite } = props;

  const {
    id,
    area,
    name,
    shUrl,
    url,
    announcementUrl,
    latestAnnouncement,
    isFavorite,
  } = house;

  const handleClickFavorite = () =>
    onClickFavorite({ houseId: house.id, to: !house.isFavorite });

  return (
    <tr
      className={trStyle}
      style={assignInlineVars({
        [backgroundColor]: isFavorite ? '#F1FDEB' : null,
      })}
    >
      <td className={tdStyle}>{area}</td>
      <td className={tdStyle}>{name}</td>
      <td className={`${tdStyle} ${homePageTdStyle}`}>
        <a className={linkStyle} href={shUrl} target="_blank">
          SH
        </a>
        {'  '}
        {url && (
          <a className={linkStyle} href={url} target="_blank">
            Official
          </a>
        )}
        {'  '}
        {announcementUrl && (
          <a className={linkStyle} href={announcementUrl} target="_blank">
            공지사항
          </a>
        )}
      </td>
      <td className={tdStyle}>{latestAnnouncement.title}</td>
      <td className={tdStyle}>{latestAnnouncement.createdAt}</td>
      <td className={tdStyle}>
        <button className={favoriteBtnStyle} onClick={handleClickFavorite}>
          {isFavorite ? (
            <StarFilled width={20} height={20} fill="#F9CC15" />
          ) : (
            <StarUnfilled width={20} height={20} fill="#F9CC15" />
          )}
        </button>
      </td>
    </tr>
  );
};

export default HouseTableRow;
