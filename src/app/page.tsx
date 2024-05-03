import {
  container,
  description,
  footer,
  link,
  title,
  titleWrapper,
} from './page.css';

import { House } from '../types/house';
import { sortHouseList } from '@utils/house';

export default async function Home() {
  const res = await fetch(process.env.API_BASE_URL + '/houses', {
    next: { revalidate: 3 },
  });
  const {
    data,
    updatedAt,
    test,
  }: { data: House[]; updatedAt: number; test: number } = await res.json();

  const THEAD_CELLS = ['지역', '이름', 'Links', '최근 공지'];

  console.log(
    'Page',
    new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    // updatedAt,
    test
  );

  return (
    <>
      <main className={container}>
        <div className={titleWrapper}>
          <h1 className={title}>Gongsiri</h1>
          <p className={description}>SH 청년안심주택 공실 안내 서비스</p>
        </div>

        <p>
          최근 업데이트:{' '}
          {new Date(updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          })}
        </p>
        <table>
          <thead>
            <tr>
              {THEAD_CELLS.map(cell => (
                <th key={cell}>{cell}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sortHouseList(data).map(house => {
              const {
                id,
                area,
                name,
                shUrl,
                url,
                announcementUrl,
                latestAnnouncement,
              } = house;
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
                      <a
                        className={link}
                        href={announcementUrl}
                        target="_blank"
                      >
                        공지사항
                      </a>
                    )}
                  </td>
                  <td>{latestAnnouncement.title}</td>
                  <td>{latestAnnouncement.createdAt}</td>
                  <td>⭐️</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      <span>{test}</span>
      <footer className={footer}>
        <p>© 2024 Gongsiri. All rights reserved.</p>
        <a href="mailto:unhyif@gmail.com">💌 Contact Developer</a>
      </footer>
    </>
  );
}
