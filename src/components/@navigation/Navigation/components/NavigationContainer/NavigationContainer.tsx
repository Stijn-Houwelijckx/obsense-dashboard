import { cn } from "utils/cn";

interface Props {
  isMenuOpen: boolean;
  children: React.ReactNode;
}

const NavigationContainer = ({ isMenuOpen, children }: Props) => {
  return (
    <nav
      className={cn(
        "h-dvh w-full fixed flex flex-col bg-secondary-900/60 text-white p-6 backdrop-blur-lg transition-all duration-[750ms] ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div
        className={cn(
          "h-full flex flex-col transition-all ease-in-out",
          isMenuOpen
            ? "opacity-100 duration-[1750ms]"
            : "opacity-0 duration-[500ms]"
        )}
      >
        {children}
      </div>
    </nav>
  );
};

export default NavigationContainer;
