import { TooltipPosition } from 'types/tooltip.types';
import { cn } from 'utils/cn';

interface Props {
  label: string;
  position?: TooltipPosition;
  children: React.ReactNode;
}

const Tooltip = ({ label, position = 'bottom-center', children }: Props) => {
  const positionClasses: Record<TooltipPosition, string> = {
    'top-start': 'bottom-full left-0',
    'top-center': 'bottom-full left-1/2 -translate-x-1/2',
    'top-end': 'bottom-full right-0',
    'bottom-start': 'top-full left-0',
    'bottom-center': 'top-full left-1/2 -translate-x-1/2',
    'bottom-end': 'top-full right-0',
    'left-start': 'right-full top-0',
    'left-center': 'right-full top-1/2 -translate-y-1/2',
    'left-end': 'right-full bottom-0',
    'right-start': 'left-full top-0',
    'right-center': 'left-full top-1/2 -translate-y-1/2',
    'right-end': 'left-full bottom-0',
  };

  return (
    <div className="w-full relative group">
      {children}
      <div
        className={cn(
          'absolute z-10 px-2 py-1 text-sm text-white bg-gray-800 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200',
          positionClasses[position],
        )}
      >
        {label}
      </div>
    </div>
  );
};

export default Tooltip;
