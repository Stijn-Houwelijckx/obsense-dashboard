import { cn } from 'utils/cn';

interface Props {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}

const Icon = ({ icon: Icon, className }: Props) => {
  return (
    <div className={cn('w-4 h-4 flex items-center justify-center', className)}>
      <Icon className="h-full w-full fill-current" />
    </div>
  );
};

export default Icon;
