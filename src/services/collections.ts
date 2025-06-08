import { ApiResponse } from 'types/api.types';
import { Collection, CollectionItem, CollectionObjectsFormData, Collections } from 'types/collection.types';

import api from './api';

export const collectionsService = {
  getCollections: async () => {
    const response = await api.get<ApiResponse<Collections>>('/artist/collections');

    if (response.status === 204) {
      return {
        code: 204,
        status: 'success',
        message: 'No collections found.',
        data: { collections: [] },
      };
    }

    return response.data;
  },
  getCollectionDetails: async (id: CollectionItem['_id']) => {
    const response = await api.get<ApiResponse<Collection>>(`/artist/collections/${id}`);
    return response.data;
  },
  updateCollection: async (id: CollectionItem['_id'], collection: FormData) => {
    const response = await api.put<ApiResponse<Collection>>(`/artist/collections/${id}`, collection, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  updateCollectionObjects: async (id: CollectionItem['_id'], objects: CollectionObjectsFormData) => {
    const response = await api.put<ApiResponse<Collection>>(`/artist/collections/${id}/add-objects`, objects);
    return response.data;
  },
  deleteCollection: async (id: CollectionItem['_id']) => {
    const response = await api.delete<ApiResponse<null>>(`/artist/collections/${id}`);
    return response.data;
  },
};
