import logo from "assets/img/logo.svg";

const NavigationHeader = () => {
  return (
    <div className="flex items-center gap-4 px-2">
      <img src={logo} alt="logo" className="w-12 h-12" />
      <span className="font-title font-semibold text-2xl text-neutral-50 tracking-wide pt-1">
        OBSENSE
      </span>
    </div>
  );
};

export default NavigationHeader;
