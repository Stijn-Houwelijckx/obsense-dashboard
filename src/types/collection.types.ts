export type Collection = {
  _id: string;
  type: string;
  title: string;
  description: string;
  city: string;
  price: number;
  coverImage: {
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: number;
  };
  objects: [];
  maxObjects: number;
  timesBought: number;
  genres: string[];
  location: {
    lat: number;
    lon: number;
  };
  likes: [];
  views: [];
  ratings: [];
  isActive: boolean;
  isPublished: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CollectionList = {
  collections: Collection[];
};