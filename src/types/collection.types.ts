import { GenreItem } from './genres.types';

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
  objects: string[];
  location?: {
    lat: number;
    lon: number;
  };
  isActive?: boolean;
  isPublished: boolean;
};

// Base form data type with required fields for all steps
export type CollectionItemFormData = Omit<CollectionItem, 'genres'> & {
  genres: string[];
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
