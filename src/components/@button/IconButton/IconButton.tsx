import { cn } from 'utils/cn';

interface Props {
  className?: string;
  disabled?: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  onEventClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton = ({ className, disabled, icon: Icon, onClick, onEventClick }: Props) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick || onEventClick}
      className={cn('h-12 w-12 flex items-center justify-center bg-secondary-800 rounded-full p-3', className)}
    >
      <Icon className="h-full w-full fill-current" />
    </button>
  );
};

export default IconButton;
