import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'queries/QueryKeys';
import { collectionsService } from 'services/collections';
import { CollectionItem } from 'types/collection.types';

const toggleCollectionPublish = async ({ id }: { id: CollectionItem['_id'] }) => {
  const response = await collectionsService.toggleCollectionPublish(id);
  return response.data;
};

export const useToggleCollectionPublish = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: toggleCollectionPublish,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: QueryKeys.collections.details(id) });

      const previousCollection = queryClient.getQueryData(QueryKeys.collections.details(id));

      return { previousCollection, id };
    },
    onError: (_, __, context) => {
      if (context?.previousCollection && context?.id) {
        queryClient.setQueryData(QueryKeys.collections.details(context.id), context.previousCollection);
      }
    },
    onSuccess: async (_, __, context) => {
      if (context?.id) {
        await queryClient.invalidateQueries({ queryKey: QueryKeys.collections.all() });
        await queryClient.invalidateQueries({ queryKey: QueryKeys.collections.details(context.id) });
      }
    },
  });

  return {
    toggleCollectionPublish: mutate,
    toggleCollectionPublishAsync: mutateAsync,
    isLoading: isPending,
  };
};
