import { CollectionItem } from 'types/collection.types';

interface Props {
  collectionId: CollectionItem['_id'];
}

const CollectionEditPublishStep = ({ collectionId }: Props) => {
  return (
    <div>
      <h2>{collectionId}</h2>
    </div>
  );
};

export default CollectionEditPublishStep;
