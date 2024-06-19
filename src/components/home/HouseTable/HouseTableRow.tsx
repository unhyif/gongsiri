import { Announcement, HouseCell } from '@/types/house';
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
import { formatInTimeZone } from 'date-fns-tz';
import { ko } from 'date-fns/locale/ko';
import { parseISO } from 'date-fns/parseISO';

const formatCreatedAt = (createdAt: Announcement['createdAt']) => {
  if (!createdAt) return createdAt;

  let formattedCreatedAt = createdAt.replaceAll('-', '.');

  const skipFormatting = (formattedCreatedAt.match(/\./g) ?? []).length < 2;

  if (!skipFormatting) {
    try {
      const isoString = formattedCreatedAt
        .split('.')
        .map(num => num.padStart(2, '0'))
        .join('-');

      formattedCreatedAt = formatInTimeZone(
        parseISO(isoString),
        'Asia/Seoul',
        'yyyy.MM.dd',
        {
          locale: ko,
        }
      );
    } catch {}
  }

  return formattedCreatedAt;
};

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
      <td className={createdAtTdStyle}>
        {formatCreatedAt(latestAnnouncement.createdAt)}
      </td>
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
