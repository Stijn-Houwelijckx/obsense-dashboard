import { useQuery } from '@tanstack/react-query';
import { StaleTime } from 'queries/constants';
import { QueryKeys } from 'queries/QueryKeys';
import { CommonQueryOptions } from 'queries/types';
import { objectsService } from 'services/objects';
import { Objects } from 'types/object.types';

const fetchObjects = async () => {
  const { data } = await objectsService.getObjects();
  return data;
};

export const useObjects = (config?: CommonQueryOptions<Objects>) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.objects.all(),
    queryFn: fetchObjects,
    staleTime: StaleTime.FIVE_MIN,
    ...config,
  });

  return { data: data?.objects, isLoading, isError };
};
