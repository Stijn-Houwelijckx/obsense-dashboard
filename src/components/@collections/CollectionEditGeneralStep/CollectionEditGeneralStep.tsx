import { useGenres } from 'queries/genres/useGenres';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { CollectionGeneralFormData, CollectionItem } from 'types/collection.types';
import { GenreItem } from 'types/genres.types';
import { cn } from 'utils/cn';

import Button from 'components/@button/Button';
import HiddenFileField from 'components/@form/HiddenFileField';
import InputField from 'components/@form/InputField';
import TagsField from 'components/@form/TagsField';
import TextAreaField from 'components/@form/TextAreaField';
import ToggleField from 'components/@form/ToggleField';
import { ChevronLeftIcon, ChevronRightIcon } from 'components/@icon';

import CollectionCoverImage from '../CollectionCoverImage';
import CollectionGenresDialog from '../CollectionGenresDialog';

interface Props {
  collection: CollectionItem;
  setFormData: (data: CollectionGeneralFormData) => void;
  setFormErrors: (hasErrors: boolean) => void;
  onBackClick: () => void;
  onSaveEdits: () => void;
}

const CollectionEditGeneralStep = ({ collection, setFormData, setFormErrors, onBackClick, onSaveEdits }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<CollectionGeneralFormData>({
    defaultValues: {
      _id: collection._id,
      type: collection.type,
      title: collection.title,
      description: collection.description,
      genres: collection.genres.map((genre) => genre._id),
      city: collection.city,
      price: collection.price,
    },
    mode: 'onChange',
  });

  const hasErrors = Object.keys(errors).length > 0;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isGenresDialogOpen, setIsGenresDialogOpen] = useState(false);

  const { data: availableGenres } = useGenres();

  const type = useWatch({ control, name: 'type' });
  const title = useWatch({ control, name: 'title' });
  const description = useWatch({ control, name: 'description' });
  const genres = useWatch({ control, name: 'genres' });
  const city = useWatch({ control, name: 'city' });
  const price = useWatch({ control, name: 'price' });
  const coverImage = useWatch({ control, name: 'coverImage' });

  const getCurrentFormData = useCallback(
    (): CollectionGeneralFormData => ({
      _id: collection._id,
      type,
      title,
      description,
      genres,
      city,
      price,
      coverImage,
    }),
    [collection._id, type, title, description, genres, city, price, coverImage],
  );

  useEffect(() => {
    const currentFormData = getCurrentFormData();
    setFormData(currentFormData);
    setFormErrors(Object.keys(errors).length > 0);
  }, [getCurrentFormData, setFormData, setFormErrors, errors]);

  useEffect(() => {
    setValue('coverImage', undefined);
  }, [collection, setValue]);

  const genreTags = genres.map((id) => {
    const genre = availableGenres?.find((g) => g._id === id);
    return { id, name: genre?.name || id };
  });

  const handleAddGenreTag = (newGenreTag: GenreItem) => {
    if (newGenreTag && !genres.includes(newGenreTag._id)) {
      setValue('genres', [...genres, newGenreTag._id]);
    }
  };

  const handleRemoveGenreTag = (removedGenreTagId: string) => {
    setValue(
      'genres',
      genres.filter((genreId) => genreId !== removedGenreTagId),
    );
  };

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (data: CollectionGeneralFormData) => {
    setFormData(data);
    onSaveEdits();
  };

  return (
    <div className="flex flex-col gap-6">
      <CollectionCoverImage
        collection={collection}
        mode="edit"
        onUploadImageClick={handleUploadImage}
        newImageFile={coverImage}
      />
      <form className="flex flex-col gap-8">
        <div className="bg-secondary-800 rounded-lg pt-6 pb-2.5 px-5">
          <HiddenFileField
            ref={fileInputRef}
            name="coverImage"
            accept="image/jpeg, image/jpg, image/png"
            onChange={(file) => setValue('coverImage', file)}
          />
          <ToggleField
            name="type"
            options={['tour', 'exposition']}
            selectedOption={type}
            hasInfo
            register={register}
            errors={errors}
            validation={{ required: 'Collection mode is required.' }}
          />
          <InputField
            label="Name"
            name="title"
            type="text"
            placeholder="The Sculptural Streets"
            register={register}
            errors={errors}
            validation={{
              required: 'Name is required.',
              minLength: { value: 3, message: 'Name must be at least 3 characters long.' },
              maxLength: { value: 35, message: 'Name must be less than 35 characters long.' },
            }}
          />
          <TextAreaField
            label="Description"
            name="description"
            placeholder="Step into a world of immersive urban sculptures, brought to life through Augmented Reality..."
            register={register}
            errors={errors}
            validation={{
              required: 'Description is required.',
              minLength: { value: 10, message: 'Description must be at least 10 characters long.' },
              maxLength: { value: 1000, message: 'Description must be less than 1000 characters long.' },
            }}
          />
          <TagsField
            name="genres"
            tags={genreTags}
            onAddTag={() => setIsGenresDialogOpen((prev) => !prev)}
            onRemoveTag={handleRemoveGenreTag}
            register={register}
            errors={errors}
          />
          <InputField
            label="Location"
            name="city"
            type="text"
            placeholder="Brussels, Belgium"
            register={register}
            errors={errors}
            validation={{
              required: 'Location is required.',
              minLength: { value: 3, message: 'Location must be at least 3 characters long.' },
              maxLength: { value: 35, message: 'Location must be less than 35 characters long.' },
            }}
          />
          <InputField
            label="Price (€)"
            name="price"
            type="number"
            placeholder="4,99"
            hasInfo
            register={register}
            errors={errors}
            validation={{
              required: 'Price is required.',
              min: { value: 0, message: 'Price must be greater than 0.' },
            }}
          />
        </div>
        <div className="flex justify-between gap-2.5">
          <Button
            label="Go back"
            disabled={hasErrors}
            leftIcon={ChevronLeftIcon}
            onClick={onBackClick}
            className={cn(
              'h-12 font-semibold text-primary-500/80 bg-secondary-800/50 border border-primary-500/50 p-3 px-3.5',
              hasErrors && 'text-neutral-100/50 bg-secondary-800 border-neutral-200/20',
            )}
            labelClassName="leading-none px-2.5"
          />
          <Button
            label="Next step"
            disabled={hasErrors}
            rightIcon={ChevronRightIcon}
            onClick={handleSubmit(onSubmit)}
            className={cn(
              'h-12 font-semibold text-primary-500/80 bg-primary-500/20 border border-primary-500/50 p-3 px-3.5',
              hasErrors && 'text-neutral-100/50 bg-secondary-800 border-neutral-200/20',
            )}
            labelClassName="leading-none px-2.5"
          />
        </div>
      </form>
      <CollectionGenresDialog
        title="Add new tag"
        genres={availableGenres}
        addGenreTag={handleAddGenreTag}
        isOpen={isGenresDialogOpen}
        closeDialog={() => setIsGenresDialogOpen((prev) => !prev)}
      />
    </div>
  );
};

export default CollectionEditGeneralStep;
