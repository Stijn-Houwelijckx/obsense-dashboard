import { ApiResponse } from 'types/api.types';
import { CollectionItem } from 'types/collection.types';
import { Objects } from 'types/object.types';

import api from './api';

export const objectsService = {
  getObjects: async () => {
    const response = await api.get<ApiResponse<Objects>>('/objects');

    if (response.status === 204) {
      return {
        code: 204,
        status: 'success',
        message: 'No objects found.',
        data: { objects: [] },
      };
    }

    return response.data;
  },
  getCollectionObjects: async (collectionId: CollectionItem['_id']) => {
    const response = await api.get<ApiResponse<Objects>>(`/objects/collections/${collectionId}`);

    if (response.status === 204) {
      return {
        code: 204,
        status: 'success',
        message: 'No objects found.',
        data: { objects: [] },
      };
    }

    return response.data;
  },
};
