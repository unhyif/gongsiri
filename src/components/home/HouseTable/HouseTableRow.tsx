import {
  backgroundColor,
  createdAtTdStyle,
  favoriteBtnStyle,
  homepageLiStyle,
  homepageTdStyle,
  homepageUlStyle,
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
      <td className={tdStyle}>
        <button className={favoriteBtnStyle} onClick={handleClickFavorite}>
          {isFavorite ? (
            <StarFilled width={20} height={20} fill="#F9CC15" />
          ) : (
            <StarUnfilled width={20} height={20} fill="#F9CC15" />
          )}
        </button>
      </td>

      <td className={tdStyle}>{area}</td>
      <td className={tdStyle}>{name}</td>

      <td className={homepageTdStyle}>
        <ul className={homepageUlStyle}>
          <li className={homepageLiStyle}>
            <a className={linkStyle} href={shUrl} target="_blank">
              SH
            </a>
          </li>

          {url && (
            <li className={homepageLiStyle}>
              <a className={linkStyle} href={url} target="_blank">
                Official
              </a>
            </li>
          )}

          {announcementUrl && (
            <li className={homepageLiStyle}>
              <a className={linkStyle} href={announcementUrl} target="_blank">
                공지사항
              </a>
            </li>
          )}
        </ul>
      </td>

      <td className={tdStyle}>{latestAnnouncement.title}</td>
      <td className={createdAtTdStyle}>{latestAnnouncement.createdAt}</td>
    </tr>
  );
};

export default HouseTableRow;
