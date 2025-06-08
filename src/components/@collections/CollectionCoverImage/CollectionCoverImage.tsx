import { useEffect, useState } from 'react';
import { CollectionItem } from 'types/collection.types';
import { cn } from 'utils/cn';

import Button from 'components/@button/Button';
import IconButton from 'components/@button/IconButton';
import Icon from 'components/@common/Icon';
import { ArrowIcon, EditIcon, UploadIcon } from 'components/@icon';
import { ArtworksIcon, LocationIcon } from 'components/@icon';

type CoverImageMode = 'edit' | 'card' | 'read' | 'default';

interface CollectionCoverImageProps {
  collection: CollectionItem;
  mode?: CoverImageMode;
  onEditClick?: () => void;
  onBackClick?: () => void;
  onUploadImageClick?: () => void;
  newImageFile?: File;
}

const CollectionCoverImage = ({
  collection,
  mode = 'default',
  onEditClick,
  onBackClick,
  onUploadImageClick,
  newImageFile,
}: CollectionCoverImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>(collection.coverImage.filePath);

  useEffect(() => {
    if (newImageFile) {
      const objectUrl = URL.createObjectURL(newImageFile);
      setImageUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImageUrl(collection.coverImage.filePath);
    }
  }, [collection, newImageFile]);

  const getInsetClass = () => {
    if (mode === 'card') {
      return 'inset-x-2.5 inset-y-2.5';
    }
    return 'inset-x-3.5 inset-y-3.5';
  };

  const getGapClass = () => {
    if (mode === 'read') {
      return 'gap-2.5';
    }
    return 'gap-1.5';
  };

  const getStatusLabelClass = () => {
    if (mode === 'card') {
      return 'text-sm pt-1 pb-0.5 px-3.5';
    }
    return 'pt-1.5 pb-0.5 px-4';
  };

  return (
    <div className="relative aspect-square rounded-lg overflow-hidden">
      <img src={imageUrl} alt={collection.title} className="w-full h-full object-cover" />

      {/* Status Label */}
      <div className={cn('absolute flex justify-end items-start', getInsetClass())}>
        <span
          className={cn(
            'font-title font-bold text-secondary-800/40 border-2 border-secondary-800/40 rounded-full tracking-wide',
            getStatusLabelClass(),
            collection.isPublished ? 'bg-status-published' : 'bg-status-draft',
          )}
        >
          {collection.isPublished ? 'Published' : 'Draft'}
        </span>
      </div>

      {/* Edit Mode (upload image) */}
      {mode === 'edit' && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 backdrop-blur-[1px]">
          <Button
            label="Upload image"
            leftIcon={UploadIcon}
            onClick={onUploadImageClick}
            className="h-12 gap-1 font-semibold text-primary-500 bg-secondary-800 border-2 border-primary-500/20 shadow-lg p-2 px-2.5"
            labelClassName="leading-none px-1.5 pt-px"
          />
        </div>
      )}

      {/* Navigation Buttons */}
      {mode === 'default' && (
        <div className={cn('absolute flex gap-2.5', getInsetClass())}>
          {onBackClick && (
            <IconButton
              icon={ArrowIcon}
              className="w-[50px] h-[50px] bg-secondary-800/80 text-neutral-100 border-2 border-neutral-100/10 backdrop-blur-sm p-2.5"
              onClick={onBackClick}
            />
          )}
          {onEditClick && (
            <IconButton
              icon={EditIcon}
              className="w-[50px] h-[50px] bg-secondary-800/80 text-neutral-100 border-2 border-neutral-100/10 backdrop-blur-sm"
              onClick={onEditClick}
            />
          )}
        </div>
      )}

      {/* Info Tags */}
      {(mode === 'card' || mode === 'read') && (
        <div className={cn('absolute flex flex-col justify-end items-start', getGapClass(), getInsetClass())}>
          <div className="flex items-center gap-1.5 bg-secondary-800/40 border border-neutral-200/20 rounded-lg backdrop-blur-sm px-2.5 p-1.5">
            <Icon icon={ArtworksIcon} />
            <span className="font-medium text-sm mr-0.5">{collection.objects.length} Objects</span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary-800/40 border border-neutral-200/20 rounded-lg backdrop-blur-sm px-2.5 p-1.5">
            <Icon icon={LocationIcon} className="mb-px" />
            <span className="font-medium text-sm mr-0.5 mt-px">{collection.city}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionCoverImage;
