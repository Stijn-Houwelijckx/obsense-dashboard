import { CollectionGeneralFormData, CollectionItem } from 'types/collection.types';

type FieldsToCheck = Pick<CollectionGeneralFormData, 'type' | 'title' | 'description' | 'city' | 'price'>;

export const isCollectionEdited = (original: CollectionItem, edited: CollectionGeneralFormData) => {
  // Check basic fields
  const basicFieldsChanged = Object.entries({
    type: original.type,
    title: original.title,
    description: original.description,
    city: original.city,
    price: original.price,
  } as FieldsToCheck).some(([key, value]) => edited[key as keyof FieldsToCheck] !== value);

  // Check genres
  const genresChanged =
    edited.genres.length !== original.genres.length ||
    !edited.genres.every((id) => original.genres.map((g) => g._id).includes(id));

  // Check if there's a new cover image file
  const hasNewCoverImage = edited.coverImage instanceof File;

  return basicFieldsChanged || genresChanged || hasNewCoverImage;
};
