export interface BaseHouse {
  id: number;
  area: string;
  name: string;
  shUrl: string;
  url: string | null;
  announcementUrl: string | null;
}

export interface House extends BaseHouse {
  latestAnnouncement: Announcement;
}

export interface Announcement {
  title: string | null;
  createdAt: string | null;
}
