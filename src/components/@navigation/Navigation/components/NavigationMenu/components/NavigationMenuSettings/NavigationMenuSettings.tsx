import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStorage } from "store/authStorage";

import { SettingsIcon, SignOutIcon } from "components/@icon";

import NavigationMenuItem from "../NavigationMenuItem";
import NavigationMenuList from "../NavigationMenuList";

const NavigationMenuSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { clearToken } = useAuthStorage();

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = () => {
    clearToken();
    navigate("/signin");
  };

  return (
    <NavigationMenuList>
      <NavigationMenuItem
        icon={SettingsIcon}
        label="Settings"
        to="/settings"
        isActive={isActiveLink("/settings")}
      />
      <NavigationMenuItem
        icon={SignOutIcon}
        label="Sign out"
        onClick={handleSignOut}
      />
    </NavigationMenuList>
  );
};

export default NavigationMenuSettings;
