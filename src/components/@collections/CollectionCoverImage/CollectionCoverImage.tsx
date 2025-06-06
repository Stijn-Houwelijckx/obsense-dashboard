import { CollectionItem } from 'types/collection.types';
import { cn } from 'utils/cn';

import Button from 'components/@button/Button';
import IconButton from 'components/@button/IconButton';
import { ArrowIcon, EditIcon, UploadIcon } from 'components/@icon';

interface CollectionCoverImageProps {
  collection: CollectionItem;
  isEditMode: boolean;
  onEditClick?: () => void;
  onBackClick?: () => void;
}

const CollectionCoverImage = ({ collection, isEditMode, onEditClick, onBackClick }: CollectionCoverImageProps) => {
  return (
    <div className="relative aspect-square rounded-lg overflow-hidden">
      <img src={collection.coverImage.filePath} alt={collection.title} className="w-full h-full object-cover" />
      <div className="absolute inset-x-3.5 inset-y-3.5 flex justify-end items-end">
        <span
          className={cn(
            'font-title font-bold text-secondary-800/40 border-2 border-secondary-800/40',
            'pt-1.5 pb-0.5 px-4 rounded-full tracking-wide',
            collection.isPublished ? 'bg-status-published' : 'bg-status-draft',
          )}
        >
          {collection.isPublished ? 'Published' : 'Draft'}
        </span>
      </div>
      {isEditMode && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/50 backdrop-blur-[1px]">
          <Button
            label="Upload image"
            leftIcon={UploadIcon}
            onClick={() => console.log('upload image')}
            className="h-12 gap-1 font-semibold text-primary-500 bg-secondary-800 border-2 border-primary-500/20 shadow-lg p-2 px-2.5"
            labelClassName="leading-none px-1.5 pt-px"
          />
        </div>
      )}
      {!isEditMode && (
        <div className="absolute inset-x-3.5 inset-y-3.5 flex gap-2.5">
          <IconButton
            icon={ArrowIcon}
            className="w-[50px] h-[50px] bg-secondary-800/80 text-neutral-100 border-2 border-neutral-100/10 backdrop-blur-sm p-2.5"
            onClick={onBackClick}
          />
          <IconButton
            icon={EditIcon}
            className="w-[50px] h-[50px] bg-secondary-800/80 text-neutral-100 border-2 border-neutral-100/10 backdrop-blur-sm"
            onClick={onEditClick}
          />
        </div>
      )}
    </div>
  );
};

export default CollectionCoverImage;
