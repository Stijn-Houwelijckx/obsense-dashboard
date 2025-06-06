import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'queries/QueryKeys';
import { genresService } from 'services/genres';
import { GenreFormData } from 'types/genres.types';

const createGenre = async (genre: GenreFormData) => {
  const { data } = await genresService.createGenre(genre);
  return data;
};

export const useCreateGenre = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending } = useMutation({
    mutationFn: createGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.genres.all() });
    },
  });

  return {
    createGenre: mutate,
    createGenreAsync: mutateAsync,
    isLoading: isPending,
  };
};
