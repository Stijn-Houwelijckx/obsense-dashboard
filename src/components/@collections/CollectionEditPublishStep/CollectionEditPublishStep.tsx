import { CollectionItem } from 'types/collection.types';

import Button from 'components/@button/Button';
import { ChevronLeftIcon, ChevronRightIcon } from 'components/@icon';

import CollectionCoverImage from '../CollectionCoverImage';

interface Props {
  collection: CollectionItem;
  onBackClick: () => void;
  onSaveEdits: () => void;
}

const CollectionEditPublishStep = ({ collection, onBackClick, onSaveEdits }: Props) => {
  console.log(collection);

  return (
    <div className="flex flex-col gap-8 pt-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-title font-semibold text-xl tracking-wide">
          {collection.isPublished ? 'Save as draft?' : 'Publish collection?'}
        </h2>
        <p className="text-sm/[1.5] text-neutral-100/80">
          {collection.isPublished
            ? 'This collection will no longer be visible to other users. You can still edit this later on...'
            : 'This collection will be published and visible to other users. You can still edit this later on...'}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <CollectionCoverImage collection={collection} mode="read" />
        <div className="flex flex-col gap-1.5 pt-4">
          <span className="font-title font-light text-xs leading-[1.15] text-neutral-50/50 uppercase tracking-widest">
            {collection.type}
          </span>
          <h3 className="font-title font-semibold text-[26px] leading-[1.15] text-primary-500 truncate tracking-wide">
            {collection.title}
          </h3>
        </div>
        <p className="text-sm/[1.65] text-neutral-100/80 pb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Quaerat illum cupiditate est dignissimos commodi blanditiis eum id aliquid
          voluptatum amet ullam explicabo officiis facilis ipsa, ut voluptates quasi qui consequatur?
        </p>
        <div className="flex flex-wrap gap-2.5 pb-2">
          {collection.genres.map((genre) => (
            <div
              key={genre._id}
              className="flex items-center text-primary-500 bg-primary-500/20 border border-primary-500/50 rounded-lg px-4 p-2.5"
            >
              <span className="font-semibold text-sm leading-none">{genre.name}</span>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-center font-title font-semibold text-xl text-neutral-100/80 bg-secondary-800/80 border-2 border-neutral-200/20 rounded-lg tracking-wider p-2.5">
          <span className="pt-1">€ {collection.price}</span>
        </div>
        <div className="flex flex-col gap-4 pt-8">
          <div className="flex items-center justify-between font-title text-xl tracking-wide">
            <h4 className="font-semibold text-neutral-100">3D Objects</h4>
            <span className="font-light text-neutral-100/50">({collection.objects.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {collection.objects.map((object) => (
              <div
                key={object._id}
                className="h-20 flex items-center gap-2.5 bg-secondary-800/80 border-2 border-neutral-200/20 rounded-lg p-2.5"
              >
                <div className="h-full aspect-square rounded-lg overflow-hidden">
                  <img src={object.thumbnail.filePath} alt={object.title} className="w-full h-full object-cover" />
                </div>
                <div className="h-full flex-1 flex items-center bg-secondary-700 rounded-lg p-3.5">
                  <span className="font-title font-semibold text-neutral-100 leading-none tracking-wide truncate pt-0.5">
                    {object.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2.5">
        <Button
          label="Go back"
          leftIcon={ChevronLeftIcon}
          onClick={onBackClick}
          className="h-12 font-semibold text-primary-500/80 bg-secondary-800/50 border border-primary-500/50 p-3 px-3.5"
          labelClassName="leading-none px-2.5"
        />
        <Button
          label={collection.isPublished ? 'Save as draft' : 'Publish'}
          rightIcon={ChevronRightIcon}
          onClick={onSaveEdits}
          className="h-12 font-semibold text-primary-500/80 bg-primary-500/20 border border-primary-500/50 p-3 px-3.5"
          labelClassName="leading-none px-2.5"
        />
      </div>
    </div>
  );
};

export default CollectionEditPublishStep;
