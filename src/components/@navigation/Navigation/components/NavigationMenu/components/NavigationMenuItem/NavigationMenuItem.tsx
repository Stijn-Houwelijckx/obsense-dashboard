import { Link } from "react-router-dom";
import { cn } from "utils/cn";

interface Props {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  to?: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavigationMenuItem = ({
  icon: Icon,
  label,
  to,
  isActive,
  onClick,
}: Props) => {
  const className = cn(
    "rounded-full px-1",
    isActive ? "text-primary-500 bg-primary-500/20" : "bg-transparent"
  );

  if (to) {
    return (
      <li className={className}>
        <Link to={to} className="flex items-center">
          <div className="p-3">
            <Icon className="h-6 w-auto fill-current" />
          </div>
          <span className="font-semibold pt-0.5">{label}</span>
        </Link>
      </li>
    );
  }

  return (
    <li className={className}>
      <button onClick={onClick} className="flex items-center">
        <div className="p-3">
          <Icon className="h-6 w-auto fill-current" />
        </div>
        <span className="font-semibold pt-0.5">{label}</span>
      </button>
    </li>
  );
};

export default NavigationMenuItem;
