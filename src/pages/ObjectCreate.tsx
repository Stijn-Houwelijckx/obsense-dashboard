import { useState } from 'react';

import MenuButton from 'components/@button/MenuButton';
import Navigation from 'components/@navigation/Navigation';

const ObjectCreate = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Navigation isMenuOpen={isMenuOpen} />
      <div className="min-h-dvh px-8 pt-6 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-title font-semibold text-[26px] text-neutral-50 pt-0.5">Add object</h1>
          <MenuButton onClick={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
      </div>
    </>
  );
};

export default ObjectCreate;
