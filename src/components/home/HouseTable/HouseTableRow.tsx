import {
  homePageTdStyle,
  linkStyle,
  tdStyle,
  trStyle,
} from './houseTableRow.css';

import { House } from '@/types/house';

interface Props {
  house: House;
}

const HouseTableRow = (props: Props) => {
  const { id, area, name, shUrl, url, announcementUrl, latestAnnouncement } =
    props.house;

  return (
    <tr className={trStyle} key={id}>
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
      <td className={tdStyle}>⭐️</td>
    </tr>
  );
};

export default HouseTableRow;
