import { HorizontalDivider } from "components/@common/Divider";

import NavigationContainer from "./components/NavigationContainer";
import NavigationHeader from "./components/NavigationHeader";
import NavigationMenu from "./components/NavigationMenu";
import NavigationProfile from "./components/NavigationProfile";

interface Props {
  isMenuOpen: boolean;
}

const Navigation = ({ isMenuOpen }: Props) => {
  return (
    <NavigationContainer isMenuOpen={isMenuOpen}>
      <NavigationHeader />
      <NavigationMenu />
      <HorizontalDivider />
      <NavigationProfile />
    </NavigationContainer>
  );
};

export default Navigation;
