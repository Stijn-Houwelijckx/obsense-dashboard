export type Collections = {
  collections: CollectionItem[];
};

export type Collection = {
  collection: CollectionItem;
};

export type CollectionItem = {
  _id: string;
  title: string;
  type: string;
  city: string;
  objects: [];
  coverImage: {
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: number;
  };
  location: {
    lat: number;
    lon: number;
  };
  isActive: boolean;
  isPublished: boolean;
};
