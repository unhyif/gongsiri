import { HouseCell } from '@/types/house';
import {
  createdAtTdStyle,
  favoriteBtnStyle,
  homepageLiStyle,
  homepageLinkStyle,
  homepageTdStyle,
  homepageUlStyle,
  linkStyle,
  tdStyle,
  trStyle,
} from './houseTableRow.css';

import StarFilled from '@assets/svgs/star_filled.svg';
import StarUnfilled from '@assets/svgs/star_unfilled.svg';

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
    onClickFavorite({ houseId: id, to: !isFavorite });

  return (
    <tr className={trStyle({ isActive: isFavorite })}>
      <td className={tdStyle}>{area}</td>
      <td className={tdStyle}>{name}</td>
      <td className={createdAtTdStyle}>{latestAnnouncement.createdAt}</td>
      <td className={tdStyle}>
        {announcementUrl ? (
          <a className={linkStyle} href={announcementUrl} target="_blank">
            {latestAnnouncement.title}
          </a>
        ) : (
          latestAnnouncement.title
        )}
      </td>
      <td className={homepageTdStyle}>
        <ul className={homepageUlStyle}>
          <li className={homepageLiStyle}>
            <a className={homepageLinkStyle} href={shUrl} target="_blank">
              SH
            </a>
          </li>

          {url && (
            <li className={homepageLiStyle}>
              <a className={homepageLinkStyle} href={url} target="_blank">
                주택 Home
              </a>
            </li>
          )}

          {announcementUrl && (
            <li className={homepageLiStyle}>
              <a
                className={homepageLinkStyle}
                href={announcementUrl}
                target="_blank"
              >
                주택 공지사항
              </a>
            </li>
          )}
        </ul>
      </td>

      <td className={tdStyle}>
        <button
          className={`${favoriteBtnStyle} favoriteBtn`}
          data-id={id}
          onClick={handleClickFavorite}
        >
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
