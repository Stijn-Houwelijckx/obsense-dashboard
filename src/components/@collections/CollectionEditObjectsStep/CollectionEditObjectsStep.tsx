import { useCollectionObjects } from 'queries/objects/useCollectionObjects';
import { useObjects } from 'queries/objects/useObjects';
import { CollectionItem } from 'types/collection.types';

interface Props {
  collectionId: CollectionItem['_id'];
}

const CollectionEditObjectsStep = ({ collectionId }: Props) => {
  const { data: objects, isLoading: isObjectsLoading } = useObjects();
  const { data: collectionObjects, isLoading: isCollectionObjectsLoading } = useCollectionObjects(collectionId);

  if (!isObjectsLoading && !isCollectionObjectsLoading) {
    console.log(objects);
    console.log(collectionObjects);
  }

  return (
    <div>
      <h2>CollectionEditObjectsStep</h2>
      <p>{collectionId}</p>
    </div>
  );
};

export default CollectionEditObjectsStep;
