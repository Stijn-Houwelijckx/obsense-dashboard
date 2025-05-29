import { useCollections } from "queries/collections/useCollections";
import { useState } from "react";

import MenuButton from "components/@button/MenuButton";
import Navigation from "components/@navigation/Navigation";
import EmptyState from "components/@state/EmptyStates/EmptyState";

const Collections = () => {
  const { data } = useCollections();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Navigation isMenuOpen={isMenuOpen} />
      <div className="min-h-dvh px-8 pt-6 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-title font-semibold text-2xl text-neutral-50 pt-0.5">
            Collections
          </h1>
          <MenuButton onClick={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
        {data && data.collections.length === 0 && (
          <EmptyState
            title="No collections..."
            description="Ready to go live? Let's build your first 3D collection and launch it into the world!"
            cta="Create collection"
          />
        )}
      </div>
    </>
  );
};

export default Collections;
