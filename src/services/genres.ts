import { ApiResponse } from 'types/api.types';
import { Genre, GenreItemFormData, Genres } from 'types/genres.types';

import api from './api';

export const genresService = {
  getGenres: async () => {
    const response = await api.get<ApiResponse<Genres>>('/genres');
    return response.data;
  },
  createGenre: async (genre: GenreItemFormData) => {
    const response = await api.post<ApiResponse<Genre>>('/genres', genre);
    return response.data;
  },
};
