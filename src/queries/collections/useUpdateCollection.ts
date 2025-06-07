import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'queries/QueryKeys';
import { collectionsService } from 'services/collections';

const updateCollection = async ({ id, collection }: { id: string; collection: FormData }) => {
  const { data } = await collectionsService.updateCollection(id, collection);
  return data;
};

export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: updateCollection,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({
        queryKey: QueryKeys.collections.details(id),
      });

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
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.collections.details(context.id),
        });
      }
    },
  });

  return {
    updateCollection: mutate,
    updateCollectionAsync: mutateAsync,
    isLoading: isPending,
  };
};
