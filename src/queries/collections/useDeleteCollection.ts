import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'queries/QueryKeys';
import { collectionsService } from 'services/collections';
import { CollectionItem } from 'types/collection.types';

const deleteCollection = async (id: CollectionItem['_id']) => {
  const response = await collectionsService.deleteCollection(id);
  return response;
};

const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCollection,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QueryKeys.collections.all() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.collections.all() });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  return { deleteCollection: mutate, isDeleting: isPending };
};

export default useDeleteCollection;
