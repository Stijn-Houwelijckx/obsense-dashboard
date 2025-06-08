import { useNavigate } from 'react-router-dom';
import { CollectionItem } from 'types/collection.types';

import IconButton from 'components/@button/IconButton';
import { EditIcon } from 'components/@icon';

import CollectionCoverImage from '../CollectionCoverImage/CollectionCoverImage';

interface Props {
  collection: CollectionItem;
}

const CollectionCard = ({ collection }: Props) => {
  const navigate = useNavigate();

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/collections/${collection._id}`, { state: { mode: 'edit' } });
  };

  return (
    <article className="flex flex-col gap-4 bg-secondary-800 rounded-lg p-4">
      <CollectionCoverImage collection={collection} mode="card" />
      <div className="flex justify-between items-center bg-secondary-700 rounded-lg p-2.5 px-3.5">
        <div className="w-3/4 flex flex-col gap-1 ">
          <span className="font-title font-light text-[10px] text-neutral-50/50 uppercase leading-[1.15] tracking-widest pt-0.5">
            {collection.type}
          </span>
          <h2 className="font-title font-semibold text-lg text-primary-500 leading-[1.15] truncate">
            {collection.title}
          </h2>
        </div>
        <IconButton
          icon={EditIcon}
          onEventClick={handleEditClick}
          className="h-11 w-11 bg-secondary-800 text-primary-500 border-2 border-primary-500/20 shadow-md p-2.5"
        />
      </div>
    </article>
  );
};

export default CollectionCard;
