import { cn } from "utils/cn";

interface Props {
  type?: "button" | "submit" | "reset";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  btnClassName?: string;
  iconClassName?: string;
  onClick?: () => void;
}

const IconButton = ({
  type = "button",
  icon: Icon,
  btnClassName,
  iconClassName,
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn("bg-secondary-800 rounded-full p-3", btnClassName)}
    >
      <Icon className={cn("h-6 w-auto fill-current", iconClassName)} />
    </button>
  );
};

export default IconButton;
