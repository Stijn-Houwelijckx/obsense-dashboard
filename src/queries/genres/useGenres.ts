import { useQuery } from '@tanstack/react-query';
import { StaleTime } from 'queries/constants';
import { CommonQueryOptions } from 'queries/types';
import { genresService } from 'services/genres';
import { Genres } from 'types/genres.types';

import { QueryKeys } from '../QueryKeys';

const fetchGenres = async () => {
  const { data } = await genresService.getGenres();
  return data;
};

export const useGenres = (config?: CommonQueryOptions<Genres>) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.genres.all(),
    queryFn: fetchGenres,
    staleTime: StaleTime.FIVE_MIN,
    ...config,
  });

  return { data: data?.genres ?? [], isLoading, isError };
};
