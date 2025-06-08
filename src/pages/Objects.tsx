import { useObjects } from 'queries/objects/useObjects';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CreateButton from 'components/@button/CreateButton';
import IconButton from 'components/@button/IconButton';
import MenuButton from 'components/@button/MenuButton';
import { HorizontalDivider } from 'components/@common/Divider';
import { PlusIcon } from 'components/@icon';
import Navigation from 'components/@navigation/Navigation';
import ObjectCard from 'components/@object/ObjectCard';
import EmptyState from 'components/@state/EmptyStates/EmptyState';

const Collections = () => {
  const navigate = useNavigate();

  // TODO: Add loading & error states
  const { data: objects } = useObjects();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Navigation isMenuOpen={isMenuOpen} />
      <div className="min-h-dvh px-8 pt-6 pb-14 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-title font-semibold text-[26px] text-neutral-50 pt-0.5">3D Objects</h1>
          <MenuButton onClick={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
        {objects && objects.length === 0 && (
          <EmptyState
            title="No objects..."
            description="Ready to go live? Let's upload your first 3D object and launch it into the world!"
            cta="Add object"
            onClick={() => navigate('/objects/create')}
          />
        )}
        {objects && objects.length > 0 && (
          <div className="flex flex-col gap-6 pt-8">
            <CreateButton to="/objects/create" label="Add object" />
            <HorizontalDivider />
            <div className="grid grid-cols-1 gap-5">
              {objects.map((object) => (
                <Link key={object._id} to={`/objects/${object._id}`}>
                  <ObjectCard object={object} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="fixed inset-x-0 bottom-0 flex justify-center items-end mb-6">
        <IconButton
          icon={PlusIcon}
          onClick={() => navigate('/objects/create')}
          className="h-14 w-14 text-primary-500 border-2 border-primary-500/20 shadow-lg rounded-lg p-2"
        />
      </div>
    </>
  );
};

export default Collections;
