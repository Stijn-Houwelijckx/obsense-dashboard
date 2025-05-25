import { cn } from "utils/cn";

interface Props {
  onClick: () => void;
  className?: string;
  isMenuOpen: boolean;
}

const MenuButton = ({ onClick, className, isMenuOpen }: Props) => {
  return (
    <button
      className={cn(
        "relative z-99 w-12 h-12 flex flex-col justify-between items-center p-[16.5px] px-3.5 bg-secondary-800 rounded-full",
        className
      )}
      onClick={onClick}
    >
      <span
        className={cn(
          "h-[2px] w-full bg-neutral-50 rounded-lg transition-all duration-500",
          isMenuOpen && "rotate-45 translate-y-[6.5px]"
        )}
      ></span>
      <span
        className={cn(
          "h-[2px] w-full bg-neutral-50 rounded-lg transition-all duration-500",
          isMenuOpen && "opacity-0"
        )}
      ></span>
      <span
        className={cn(
          "h-[2px] w-full bg-neutral-50 rounded-lg transition-all duration-500",
          isMenuOpen && "-rotate-45 -translate-y-[6.5px]"
        )}
      ></span>
    </button>
  );
};

export default MenuButton;
