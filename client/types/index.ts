export interface Video {
  _id: string;
  owner: string;
  published: boolean;
  videoId: string;
  createdAd: Date;
  updatedAt: Date;
  __v: number;
  extension: string;
  description: string;
  title: string;
}

export enum QueryKeys {
  me = 'me',
  videos = 'videos',
}

export interface Me {
  _id: string;
  email: string;
  username: string;
}
