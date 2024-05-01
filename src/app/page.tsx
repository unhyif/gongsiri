import { House } from '../types';

export default async function Home() {
  const res = await fetch(process.env.API_BASE_URL + '/houses', {
    next: { revalidate: 600 },
  });
  const { data, updatedAt }: { data: House[]; updatedAt: number } =
    await res.json();

  return (
    <main>
      최근 업데이트:{' '}
      {new Date(updatedAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
      <ul style={{ padding: '24px' }}>
        {data.map(house => {
          const { id, area, name, announcementUrl, latestAnnouncement } = house;
          return (
            <li key={id}>
              {area} {name} {announcementUrl} {latestAnnouncement.title}{' '}
              {latestAnnouncement.createdAt}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
