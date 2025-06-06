import { CollectionItem } from 'types/collection.types';

import IconButton from 'components/@button/IconButton';
import Icon from 'components/@common/Icon';
import { ArtworksIcon, EditIcon, LocationIcon } from 'components/@icon';

interface Props {
  collection: CollectionItem;
}

const CollectionCard = ({ collection }: Props) => {
  return (
    <article key={collection._id} className="flex flex-col gap-4 bg-secondary-800 rounded-lg p-4">
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <img src={collection.coverImage.filePath} alt={collection.title} className="w-full h-full object-cover" />
        <div className="absolute inset-x-2.5 inset-y-2.5 flex justify-end items-start">
          <span
            className={`font-title font-bold text-sm text-secondary-800/40 border-2 border-secondary-800/40 ${
              collection.isPublished ? 'bg-status-published' : 'bg-status-draft'
            } pt-1 pb-0.5 px-3.5 rounded-full tracking-wide`}
          >
            {collection.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
        <div className="absolute inset-x-2.5 inset-y-2.5 flex flex-col gap-1.5 justify-end items-start">
          <div className="flex items-center gap-1.5 bg-secondary-800/40 border border-neutral-200/20 rounded-lg backdrop-blur-sm px-2.5 p-1.5">
            <Icon icon={ArtworksIcon} />
            <span className="font-medium text-sm mr-0.5">{collection.objects.length} Objects</span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary-800/40 border border-neutral-200/20 rounded-lg backdrop-blur-sm px-2.5 p-1.5">
            <Icon icon={LocationIcon} className="mb-px" />
            <span className="font-medium text-sm mr-0.5 mt-px">{collection.city}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center bg-secondary-700 rounded-lg p-2.5 px-3.5">
        <div className="flex flex-col gap-1 w-3/4">
          <span className="font-title font-light text-[10px] text-neutral-50/50 uppercase leading-[1.15] tracking-widest pt-0.5">
            {collection.type}
          </span>
          <h2 className="font-title truncate font-semibold text-lg text-primary-500 leading-[1.15]">
            {collection.title}
          </h2>
        </div>
        <IconButton
          icon={EditIcon}
          className="h-11 w-11 bg-secondary-800 text-primary-500 border-2 border-primary-500/20 shadow-md p-2.5"
        />
      </div>
    </article>
  );
};

export default CollectionCard;
