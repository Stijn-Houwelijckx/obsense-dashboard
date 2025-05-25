import { cn } from "utils/cn";

interface Props {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  type?: "button" | "submit" | "reset";
  btnClassName?: string;
  iconClassName?: string;
}

const LogoButton = ({
  icon: Icon,
  type = "button",
  btnClassName,
  iconClassName,
}: Props) => {
  return (
    <button
      type={type}
      className={cn(
        "flex flex-1 justify-center bg-primary-500/20 border border-primary-500 rounded-lg p-2",
        btnClassName
      )}
    >
      <Icon
        className={cn(
          "h-6 w-auto fill-current text-primary-500 sm:h-7",
          iconClassName
        )}
      />
    </button>
  );
};

export default LogoButton;
