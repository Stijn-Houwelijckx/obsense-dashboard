import NavigationMenuMain from "./components/NavigationMenuMain";
import NavigationMenuSettings from "./components/NavigationMenuSettings";

const NavigationMenu = () => {
  return (
    <div className="h-full flex flex-col justify-between mt-8 mb-6">
      <NavigationMenuMain />
      <NavigationMenuSettings />
    </div>
  );
};

export default NavigationMenu;
