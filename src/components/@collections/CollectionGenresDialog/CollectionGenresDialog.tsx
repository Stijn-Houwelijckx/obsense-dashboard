import { useCreateGenre } from 'queries/genres/useCreateGenre';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GenreItem } from 'types/genres.types';

import Button from 'components/@button/Button';
import DialogContainer from 'components/@dialog/DialogContainer';
import InputField from 'components/@form/InputField';
import { ChevronLeftIcon, ChevronRightIcon } from 'components/@icon';

interface Props {
  title: string;
  genres: GenreItem[];
  addGenreTag: (genre: GenreItem) => void;
  isOpen: boolean;
  closeDialog: () => void;
}

const CollectionGenresDialog = ({ title, genres, addGenreTag, isOpen, closeDialog }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<{ genre: string }>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const [isFocused, setIsFocused] = useState(false);

  const { createGenreAsync, isLoading } = useCreateGenre();

  const filterGenresData = (genres: GenreItem[], search: string) => {
    if (!search || search.length < 3) return [];
    return genres.filter((genre) => genre.name.toLowerCase().includes(search.toLowerCase()));
  };

  const genresInput = watch('genre');
  const filteredGenres = filterGenresData(genres, genresInput);

  const onSubmit = async (data: { genre: string }) => {
    const existingGenre = filteredGenres.find(
      (genre) => genre.name.toLowerCase() === data.genre.toLowerCase(),
    );

    if (existingGenre) {
      addGenreTag(existingGenre);
    } else {
      try {
        const newGenre = await createGenreAsync({ genre: { name: data.genre } });
        addGenreTag(newGenre.genre);
      } catch (error) {
        console.error('Failed to create genre:', error);
      }
    }
    reset();
    closeDialog();
  };

  return (
    <DialogContainer title={title} isOpen={isOpen} onCloseDialog={closeDialog}>
      <form className="mt-5">
        <InputField
          label="Genre"
          name="genre"
          type="text"
          placeholder="abstract, urban, interactive, ..."
          onFocus={() => setIsFocused(true)}
          register={register}
          errors={errors}
          validation={{
            required: 'Genre is required.',
            maxLength: { value: 20, message: 'Genre must be less than 20 characters.' },
            pattern: {
              value: /^[a-zA-Z\s-]+$/,
              message: "Genre can't contain special characters.",
            },
          }}
        />
        <div className="relative">
          {isFocused && filteredGenres.length > 0 && (
            <div className="absolute w-full max-h-[134px] -mt-2.5 overflow-y-auto bg-secondary-700 border border-neutral-500 rounded-lg shadow-lg z-10 p-1.5">
              {filteredGenres.map((genre) => (
                <Button
                  key={genre._id}
                  label={genre.name}
                  className="w-full justify-start font-medium text-neutral-100 bg-transparent hover:text-primary-500 hover:bg-primary-500/20 rounded-lg p-2 px-3"
                  onClick={() => {
                    setValue('genre', genre.name);
                    setIsFocused(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <Button
            label="Cancel"
            className="h-12 font-semibold text-primary-500/80 bg-secondary-800/50 border border-primary-500/50 p-3 px-3.5"
            labelClassName="leading-none px-2.5"
            leftIcon={ChevronLeftIcon}
            onClick={closeDialog}
          />
          <Button
            label={isLoading ? 'Adding...' : 'Add tag'}
            className="h-12 font-semibold text-primary-500/80 bg-primary-500/20 border border-primary-500/50 p-3 px-3.5"
            labelClassName="leading-none px-2.5"
            rightIcon={ChevronRightIcon}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </DialogContainer>
  );
};

export default CollectionGenresDialog;
