import { useLocation } from 'react-router-dom';

import { ArtworksIcon, CollectionsIcon, HomeIcon, InsightsIcon } from 'components/@icon';

import NavigationMenuItem from '../NavigationMenuItem';
import NavigationMenuList from '../NavigationMenuList';

const NavigationMenuMain = () => {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <NavigationMenuList>
      <NavigationMenuItem icon={HomeIcon} label="Home" to="/" isActive={isActiveLink('/')} />
      <NavigationMenuItem
        icon={CollectionsIcon}
        label="Collections"
        to="/collections"
        isActive={isActiveLink('/collections')}
      />
      <NavigationMenuItem
        icon={ArtworksIcon}
        label="3D Objects"
        to="/objects"
        isActive={isActiveLink('/objects')}
      />
      <NavigationMenuItem
        icon={InsightsIcon}
        label="Insights"
        to="/insights"
        isActive={isActiveLink('/insights')}
      />
    </NavigationMenuList>
  );
};

export default NavigationMenuMain;
