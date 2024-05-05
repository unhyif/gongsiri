export interface Announcement {
  title: string | null;
  createdAt: string | null;
}

export interface House {
  id: number;
  area: string;
  name: string;
  shUrl: string;
  url: string | null;
  announcementUrl: string | null;
  latestAnnouncement: Announcement;
}

export interface HouseCell extends House {
  isFavorite: boolean;
}
