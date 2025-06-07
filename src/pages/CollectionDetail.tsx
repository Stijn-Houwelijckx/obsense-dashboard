import { useCollectionDetails } from 'queries/collections/useCollectionDetails';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CollectionItem } from 'types/collection.types';

import MenuButton from 'components/@button/MenuButton';
import CollectionDetailsEdit from 'components/@collections/CollectionDetailsEdit';
import CollectionDetailsRead from 'components/@collections/CollectionDetailsRead';
import Navigation from 'components/@navigation/Navigation';

const CollectionDetail = () => {
  const { collectionId } = useParams<{ collectionId: CollectionItem['_id'] }>();
  const { data: collection } = useCollectionDetails(collectionId);

  const [isEditMode, setIsEditMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentEditStep, setCurrentEditStep] = useState(1);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Navigation isMenuOpen={isMenuOpen} />
      <div className="min-h-dvh px-8 pt-6 pb-14 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-title font-semibold text-[26px] text-neutral-50 pt-0.5">
            {isEditMode ? 'Edit collection' : 'Collection details'}
          </h1>
          <MenuButton onClick={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
        {collection && (
          <div className="pt-8">
            {isEditMode ? (
              <CollectionDetailsEdit
                collection={collection}
                currentEditStep={currentEditStep}
                setCurrentEditStep={setCurrentEditStep}
                setIsEditMode={setIsEditMode}
              />
            ) : (
              <CollectionDetailsRead collection={collection} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionDetail;
