import { Link } from "react-router-dom";

import IconButton from "components/@button/IconButton";
import { ChevronIcon } from "components/@icon";

const NavigationProfile = () => {
  return (
    <Link to="/settings" className="flex items-center gap-4 mt-4 px-1">
      <div className="w-12 h-12 rounded-full bg-secondary-800"></div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">Emiel Houman</span>
        <span className="text-xs text-neutral-100/50">
          emielhouman@gmail.com
        </span>
      </div>
      <IconButton
        icon={ChevronIcon}
        btnClassName="ml-auto bg-transparent"
        iconClassName="text-neutral-100/50"
      />
    </Link>
  );
};

export default NavigationProfile;
