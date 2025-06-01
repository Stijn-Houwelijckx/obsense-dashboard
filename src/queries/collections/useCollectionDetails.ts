import { useQuery } from '@tanstack/react-query';
import { StaleTime } from 'queries/constants';
import { QueryKeys } from 'queries/QueryKeys';
import { CommonQueryOptions } from 'queries/types';
import { collectionsService } from 'services/collections';
import { Collection, CollectionItem } from 'types/collection.types';

const fetchCollectionDetails = async (collectionId: CollectionItem['_id']) => {
  const { data } = await collectionsService.getCollectionDetails(collectionId);
  return data;
};

export const useCollectionDetails = (
  collectionId: CollectionItem['_id'] | undefined,
  config?: CommonQueryOptions<Collection>,
) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.collections.details(collectionId ?? ''),
    queryFn: () => fetchCollectionDetails(collectionId!),
    enabled: !!collectionId,
    staleTime: StaleTime.FIVE_MIN,
    ...config,
  });

  return { data: data?.collection, isLoading, isError };
};
