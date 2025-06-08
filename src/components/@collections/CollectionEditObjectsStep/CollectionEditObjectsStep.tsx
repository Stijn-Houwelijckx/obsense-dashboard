import { AnimatePresence, motion } from 'framer-motion';
import { isEqual } from 'lodash';
import { useCollectionObjects } from 'queries/objects/useCollectionObjects';
import { useObjects } from 'queries/objects/useObjects';
import { useEffect, useMemo, useState } from 'react';
import { CollectionItemFormData } from 'types/collection.types';

import Button from 'components/@button/Button';
import { ChevronLeftIcon, ChevronRightIcon } from 'components/@icon';
import ObjectCard from 'components/@object/ObjectCard';

interface Props {
  collectionId: CollectionItemFormData['_id'];
  setIsEdited: (isEdited: boolean) => void;
  setSelectedObjects: (objects: string[]) => void;
  onBackClick: () => void;
  onSaveEdits: () => void;
}

const CollectionEditObjectsStep = ({
  collectionId,
  setIsEdited,
  setSelectedObjects,
  onBackClick,
  onSaveEdits,
}: Props) => {
  const { data: objects } = useObjects();
  const { data: collectionObjects } = useCollectionObjects(collectionId);

  const [selectedObjectIds, setSelectedObjectIds] = useState<CollectionItemFormData['objects']>([]);

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
        <div className="flex flex-col gap-8 pt-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between font-title text-xl tracking-wide">
              <h2 className="font-semibold text-neutral-100">Selected objects</h2>
              <span className="font-light text-neutral-100/50">({selectedObjectIds.length})</span>
            </div>
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
          <div className="flex justify-between gap-2.5">
            <Button
              label="Go back"
              leftIcon={ChevronLeftIcon}
              onClick={onBackClick}
              className="h-12 font-semibold text-primary-500/80 bg-secondary-800/50 border border-primary-500/50 p-3 px-3.5"
              labelClassName="leading-none px-2.5"
            />
            <Button
              label="Next step"
              rightIcon={ChevronRightIcon}
              onClick={onSaveEdits}
              className="h-12 font-semibold text-primary-500/80 bg-primary-500/20 border border-primary-500/50 p-3 px-3.5"
              labelClassName="leading-none px-2.5"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CollectionEditObjectsStep;
