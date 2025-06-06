import { useCollections } from 'queries/collections/useCollections';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import IconButton from 'components/@button/IconButton';
import MenuButton from 'components/@button/MenuButton';
import CollectionCard from 'components/@collections/CollectionCard';
import CollectionCreateButton from 'components/@collections/CollectionCreateButton';
import { HorizontalDivider } from 'components/@common/Divider';
import { PlusIcon } from 'components/@icon';
import Navigation from 'components/@navigation/Navigation';
import EmptyState from 'components/@state/EmptyStates/EmptyState';

const Collections = () => {
  const navigate = useNavigate();

  // TODO: Add loading & error states
  const { data: collections } = useCollections();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Navigation isMenuOpen={isMenuOpen} />
      <div className="min-h-dvh px-8 pt-6 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-title font-semibold text-[26px] text-neutral-50 pt-0.5">Collections</h1>
          <MenuButton onClick={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
        {collections && collections.length === 0 && (
          <EmptyState
            title="No collections..."
            description="Ready to go live? Let's build your first 3D collection and launch it into the world!"
            cta="Create collection"
          />
        )}
        {collections && collections.length > 0 && (
          <div className="flex flex-col gap-6 mt-8 mb-8">
            <CollectionCreateButton />
            <HorizontalDivider />
            <div className="grid grid-cols-1 gap-5">
              {collections.map((collection) => (
                <Link key={collection._id} to={`/collections/${collection._id}`}>
                  <CollectionCard collection={collection} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="fixed inset-x-0 bottom-0 flex justify-center items-end mb-6">
        <IconButton
          icon={PlusIcon}
          onClick={() => navigate('/collections/create')}
          className="h-14 w-14 text-primary-500 border-2 border-primary-500/20 shadow-lg rounded-lg p-2"
        />
      </div>
    </>
  );
};

export default Collections;
