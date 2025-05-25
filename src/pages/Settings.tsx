import { useState } from "react";

import MenuButton from "components/@button/MenuButton";
import Navigation from "components/@navigation/Navigation";

const Settings = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Navigation isMenuOpen={isMenuOpen} />
      <div className="px-8 pt-6">
        <div className="flex justify-between items-center">
          <h1 className="font-title font-semibold text-2xl text-neutral-50 pt-0.5">
            Settings
          </h1>
          <MenuButton onClick={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>
      </div>
    </>
  );
};

export default Settings;
