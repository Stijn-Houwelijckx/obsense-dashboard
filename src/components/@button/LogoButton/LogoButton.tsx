import { cn } from 'utils/cn';

interface Props {
  className?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const LogoButton = ({ className, icon: Icon }: Props) => {
  return (
    <button
      type="button"
      className={cn(
        'h-10 sm:h-11 w-auto flex flex-1 justify-center bg-primary-500/20 text-primary-500 border border-primary-500 rounded-lg p-1.5',
        className,
      )}
    >
      <Icon className="h-full w-full fill-current" />
    </button>
  );
};

export default LogoButton;
