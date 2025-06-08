import { AnimatePresence, motion } from 'framer-motion';
import { isEqual } from 'lodash';
import { useCollectionObjects } from 'queries/objects/useCollectionObjects';
import { useObjects } from 'queries/objects/useObjects';
import { useEffect, useMemo, useState } from 'react';
import { CollectionItem } from 'types/collection.types';

import ObjectCard from 'components/@object/ObjectCard';

interface Props {
  collectionId: CollectionItem['_id'];
  setIsEdited: (isEdited: boolean) => void;
  onNextEditStep: () => void;
  setSelectedObjects: (objects: string[]) => void;
  onBackClick: () => void;
  onSaveEdits: () => void;
}

const CollectionEditObjectsStep = ({ collectionId, setIsEdited, setSelectedObjects }: Props) => {
  const { data: objects } = useObjects();
  const { data: collectionObjects } = useCollectionObjects(collectionId);

  const [selectedObjectIds, setSelectedObjectIds] = useState<CollectionItem['objects']>([]);

  // Initialization effect
  useEffect(() => {
    if (collectionObjects) {
      const initialObjectIds = collectionObjects.map((obj) => obj._id);
      setSelectedObjects(initialObjectIds);
      setSelectedObjectIds(initialObjectIds);
      setIsEdited(false);
    }
  }, [collectionObjects, setSelectedObjects, setIsEdited]);

  // Changes detection effect
  useEffect(() => {
    if (collectionObjects) {
      const initialObjectIds = collectionObjects.map((obj) => obj._id);
      setSelectedObjects(selectedObjectIds);
      setIsEdited(!isEqual(initialObjectIds, selectedObjectIds));
    }
  }, [selectedObjectIds, collectionObjects, setIsEdited, setSelectedObjects]);

  const sortedObjects = useMemo(() => {
    if (!objects) return [];
    return [...objects].sort((a, b) => {
      const aSelected = selectedObjectIds.includes(a._id);
      const bSelected = selectedObjectIds.includes(b._id);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });
  }, [objects, selectedObjectIds]);

  const handleObjectToggle = (objectId: string) => {
    setSelectedObjectIds((prev) => {
      const newObjectIds = prev.includes(objectId) ? prev.filter((id) => id !== objectId) : [...prev, objectId];
      return newObjectIds;
    });
  };

  return (
    <>
      {sortedObjects.length > 0 && (
        <div className="flex flex-col gap-4 pt-4">
          <h2 className="font-title font-semibold text-xl text-neutral-100">
            Selected objects ({selectedObjectIds.length})
          </h2>
          <div className="grid grid-cols-1 gap-5">
            <AnimatePresence>
              {sortedObjects.map((object) => (
                <motion.div
                  key={object._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.25 }}
                  layout
                >
                  <ObjectCard
                    object={object}
                    isSelected={selectedObjectIds.includes(object._id)}
                    onSelect={() => handleObjectToggle(object._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionEditObjectsStep;
