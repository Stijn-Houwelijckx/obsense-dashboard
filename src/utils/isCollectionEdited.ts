import { CollectionItem, CollectionItemFormData } from 'types/collection.types';

type FormDataKeys = keyof CollectionItemFormData;

export const isCollectionEdited = (original: CollectionItem, edited: CollectionItemFormData) => {
  return (
    Object.entries({
      type: original.type,
      title: original.title,
      description: original.description,
      city: original.city,
      price: original.price,
    }).some(([key, value]) => edited[key as FormDataKeys] !== value) ||
    edited.genres.length !== original.genres.length ||
    !edited.genres.every((id) => original.genres.map((g) => g._id).includes(id))
  );
};
