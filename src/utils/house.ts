import { Announcement, House, HouseCell } from '@/types/house';
import { formatInTimeZone } from 'date-fns-tz';
import { ko } from 'date-fns/locale';

export const formatCreatedAt = (createdAt: Announcement['createdAt']) => {
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
        new Date(isoString),
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

const isValidDate = (date: Date | null) =>
  date instanceof Date && !isNaN(date.getTime());

const isInValidDate = (date: Date | null) =>
  date instanceof Date && isNaN(date.getTime());

export const sortHouses = (houses: House[]) =>
  houses.sort((a, b) => {
    // elyes 우선 정렬
    const aIsElyes = a.url?.includes('elyes.co.kr');
    const bIsElyes = b.url?.includes('elyes.co.kr');
    if (aIsElyes && bIsElyes) {
      return a.area.localeCompare(b.area);
    } else if (aIsElyes && !bIsElyes) {
      return -1;
    } else if (!aIsElyes && bIsElyes) {
      return 1;
    }

    const dateA = a.latestAnnouncement.createdAt
      ? new Date(a.latestAnnouncement.createdAt)
      : null;
    const dateB = b.latestAnnouncement.createdAt
      ? new Date(b.latestAnnouncement.createdAt)
      : null;

    // 1. Invalid Date 객체가 가장 먼저 오게 하고, 이들 사이에선 createdAt, area, name 필드를 오름차순으로 정렬
    if (isInValidDate(dateA) && isInValidDate(dateB)) {
      if (a.latestAnnouncement.createdAt && b.latestAnnouncement.createdAt) {
        const createdAtComparison =
          a.latestAnnouncement.createdAt.localeCompare(
            b.latestAnnouncement.createdAt
          );
        if (createdAtComparison !== 0) {
          return createdAtComparison;
        }
      }
      const areaComparison = a.area.localeCompare(b.area);
      if (areaComparison !== 0) {
        return areaComparison;
      }
      return a.name.localeCompare(b.name);
    } else if (isInValidDate(dateA)) {
      return -1;
    } else if (isInValidDate(dateB)) {
      return 1;
    }

    // 2. Valid Date 객체는 최신순으로 정렬하고, 이들 사이에선 area, name 필드를 오름차순으로 정렬
    if (isValidDate(dateA) && isValidDate(dateB)) {
      const dateComparison = dateB!.getTime() - dateA!.getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
      const areaComparison = a.area.localeCompare(b.area);
      if (areaComparison !== 0) {
        return areaComparison;
      }
      return a.name.localeCompare(b.name);
    }

    // 3. createdAt가 null인 객체를 마지막에 정렬하고, 이들 사이에선 area, name 필드를 오름차순으로 정렬
    if (dateA === null && dateB === null) {
      const areaComparison = a.area.localeCompare(b.area);
      if (areaComparison !== 0) {
        return areaComparison;
      }
      return a.name.localeCompare(b.name);
    } else if (dateA === null) {
      return 1;
    } else if (dateB === null) {
      return -1;
    }

    // name 필드 오름차순 정렬
    return a.name.localeCompare(b.name);
  });

export const sortHousesByIsFavorite = (houses: HouseCell[]) =>
  houses.sort((a, b) =>
    a.isFavorite === b.isFavorite ? 0 : a.isFavorite ? -1 : 1
  );
