import { House } from '@/types/house';
import { link } from '@app/page.css';

interface Props {
  house: House;
}

export const HouseTableRow = (props: Props) => {
  const { id, area, name, shUrl, url, announcementUrl, latestAnnouncement } =
    props.house;

  return (
    <tr key={id}>
      <td>{area}</td>
      <td>{name}</td>
      <td>
        <a className={link} href={shUrl} target="_blank">
          SH
        </a>{' '}
        {url && (
          <a className={link} href={url} target="_blank">
            Official
          </a>
        )}{' '}
        {announcementUrl && (
          <a className={link} href={announcementUrl} target="_blank">
            공지사항
          </a>
        )}
      </td>
      <td>{latestAnnouncement.title}</td>
      <td>{latestAnnouncement.createdAt}</td>
      <td>⭐️</td>
    </tr>
  );
};
