import { contactStyle, linkStyle } from './page.css';

import { House } from '../types';
import { sortHouseList } from '@utils/array';

export default async function Home() {
  const res = await fetch(process.env.API_BASE_URL + '/houses', {
    next: { revalidate: 600 },
  });
  const { data, updatedAt }: { data: House[]; updatedAt: number } =
    await res.json();

  console.log(
    'Page',
    new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    data.length,
    updatedAt
  );

  return (
    <>
      <main>
        <div>
          <h1>Gongsiri</h1>
          <p>SH 청년안심주택 공실 안내 서비스</p>
          <p>
            최근 업데이트:{' '}
            {new Date(updatedAt).toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
            })}
          </p>
        </div>

        <table>
          <thead>
            <tr>
              {['지역', '이름', 'Links', '최근 공지'].map(col => (
                <th key={col}>{col}</th>
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
                    <a className={linkStyle} href={shUrl} target="_blank">
                      SH
                    </a>{' '}
                    {url && (
                      <a className={linkStyle} href={url} target="_blank">
                        Official
                      </a>
                    )}{' '}
                    {announcementUrl && (
                      <a
                        className={linkStyle}
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

      <footer>
        <p>© 2024 Gongsiri. All rights reserved.</p>
        <a className={contactStyle} href="mailto:unhyif@gmail.com">
          💌 Contact Developer
        </a>
      </footer>
    </>
  );
}
