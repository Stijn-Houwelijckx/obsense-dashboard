import { CollectionItem } from 'types/collection.types';
import { ObjectItem } from 'types/object.types';

export const QueryKeys = {
  collections: {
    all: () => ['collections'],
    details: (id: CollectionItem['_id']) => ['collections', id],
  },
  genres: {
    all: () => ['genres'],
  },
  objects: {
    all: () => ['objects'],
    collection: (collectionId: ObjectItem['_id']) => ['objects', collectionId],
  },
};
