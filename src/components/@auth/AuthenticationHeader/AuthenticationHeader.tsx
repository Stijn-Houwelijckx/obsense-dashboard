import { cn } from 'utils/cn';

import IconButton from 'components/@button/IconButton';
import { ArrowIcon } from 'components/@icon';

interface Props {
  title: string;
  className?: string;
  currentFormStep?: number;
  onClick?: () => void;
}

const AuthenticationHeader = ({ title, className, currentFormStep, onClick }: Props) => {
  return (
    <div
      className={cn(
        'w-full grid grid-cols-[1fr_auto_1fr] px-8 py-3.5 sm:w-2/3 sm:p-6 lg:w-3/5 xl:hidden',
        className,
      )}
    >
      {currentFormStep && currentFormStep > 1 && (
        <IconButton
          icon={ArrowIcon}
          onClick={onClick}
          className="justify-self-start text-neutral-200"
        />
      )}
      <h1 className="min-h-12 flex justify-center items-center col-start-2 font-title font-bold text-3xl tracking-wide pt-1 sm:text-4xl">
        {title}
      </h1>
    </div>
  );
};

export default AuthenticationHeader;
