import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'queries/QueryKeys';
import { collectionsService } from 'services/collections';

const deleteCollection = async (id: string) => {
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
