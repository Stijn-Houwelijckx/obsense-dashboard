import { GenreItem } from './genres.types';
import { ObjectItem } from './object.types';

export type Collections = {
  collections: CollectionItem[];
};

export type Collection = {
  collection: CollectionItem;
};

export type CollectionItem = {
  _id: string;
  type: string;
  title: string;
  description: string;
  city: string;
  price: number;
  genres: GenreItem[];
  coverImage: {
    fileName: string;
    filePath: string;
    fileType: string;
    fileSize: number;
  };
  objects: ObjectItem[];
  location?: {
    lat: number;
    lon: number;
  };
  isActive?: boolean;
  isPublished: boolean;
};


export type CollectionItemFormData = Omit<CollectionItem, 'genres' | 'objects'> & {
  genres: string[];
  objects: string[];
};

export type CollectionFormData = {
  collection: CollectionItemFormData;
};

// Specific form data type for the general step
export type CollectionGeneralFormData = Omit<
  CollectionItemFormData,
  'objects' | 'location' | 'isActive' | 'isPublished' | 'coverImage'
> & {
  coverImage?: File;
};

// Specific form data type for the objects step
export type CollectionObjectsFormData = {
  objects: {
    objectIds: string[];
  };
};
