import { cn } from 'utils/cn';

interface Props {
  className?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

const IconButton = ({ className, icon: Icon, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-12 w-12 flex items-center justify-center bg-secondary-800 rounded-full p-3',
        className,
      )}
    >
      <Icon className="h-full w-full fill-current" />
    </button>
  );
};

export default IconButton;
