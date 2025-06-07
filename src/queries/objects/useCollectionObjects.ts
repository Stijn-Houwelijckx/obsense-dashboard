import { useQuery } from '@tanstack/react-query';
import { StaleTime } from 'queries/constants';
import { QueryKeys } from 'queries/QueryKeys';
import { CommonQueryOptions } from 'queries/types';
import { objectsService } from 'services/objects';
import { ObjectItem, Objects } from 'types/object.types';

const fetchCollectionObjects = async (collectionId: ObjectItem['_id']) => {
  const { data } = await objectsService.getCollectionObjects(collectionId);
  return data;
};

export const useCollectionObjects = (collectionId: ObjectItem['_id'], config?: CommonQueryOptions<Objects>) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.objects.collection(collectionId),
    queryFn: () => fetchCollectionObjects(collectionId),
    staleTime: StaleTime.FIVE_MIN,
    ...config,
  });

  return { data: data?.objects, isLoading, isError };
};
