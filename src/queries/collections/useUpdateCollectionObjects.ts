import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'queries/QueryKeys';
import { collectionsService } from 'services/collections';
import { CollectionItem, CollectionObjectsFormData } from 'types/collection.types';

const updateCollectionObjects = async ({
  id,
  objects,
}: {
  id: CollectionItem['_id'];
  objects: CollectionObjectsFormData;
}) => {
  const { data } = await collectionsService.updateCollectionObjects(id, objects);
  return data;
};

export const useUpdateCollectionObjects = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: updateCollectionObjects,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: QueryKeys.objects.collection(id),
      });
      await queryClient.cancelQueries({
        queryKey: QueryKeys.collections.details(id),
      });

      const previousCollectionObjects = queryClient.getQueryData(QueryKeys.objects.collection(id));
      const previousCollection = queryClient.getQueryData(QueryKeys.collections.details(id));

      return { previousCollectionObjects, previousCollection, id };
    },
    onError: (_, __, context) => {
      if (context?.previousCollectionObjects && context?.id) {
        queryClient.setQueryData(QueryKeys.objects.collection(context.id), context.previousCollectionObjects);
      }
      if (context?.previousCollection && context?.id) {
        queryClient.setQueryData(QueryKeys.collections.details(context.id), context.previousCollection);
      }
    },
    onSuccess: async (_, __, context) => {
      if (context?.id) {
        await queryClient.invalidateQueries({ queryKey: QueryKeys.objects.collection(context.id) });
        await queryClient.invalidateQueries({ queryKey: QueryKeys.collections.details(context.id) });
      }
    },
  });

  return {
    updateCollectionObjects: mutate,
    updateCollectionObjectsAsync: mutateAsync,
    isLoading: isPending,
  };
};
