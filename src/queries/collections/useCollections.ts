import { useQuery } from '@tanstack/react-query';
import { StaleTime } from 'queries/constants';
import { QueryKeys } from 'queries/QueryKeys';
import { CommonQueryOptions } from 'queries/types';
import { collectionsService } from 'services/collections';
import { Collections } from 'types/collection.types';

const fetchCollections = async () => {
  const { data } = await collectionsService.getCollections();
  return data;
};

export const useCollections = (config?: CommonQueryOptions<Collections>) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.collections.all(),
    queryFn: fetchCollections,
    staleTime: StaleTime.FIVE_MIN,
    ...config,
  });

  return { data: data?.collections, isLoading, isError };
};
