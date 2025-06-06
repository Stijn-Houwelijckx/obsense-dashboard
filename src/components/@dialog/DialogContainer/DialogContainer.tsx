import { useEffect } from 'react';

import IconButton from 'components/@button/IconButton';
import { CloseIcon } from 'components/@icon/CloseIcon';

interface Props {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onCloseDialog: () => void;
}

const SimpleDialog = ({ title, children, isOpen, onCloseDialog }: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-secondary-900 bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onCloseDialog}
    >
      <div
        className="bg-secondary-800 rounded-lg w-full mx-4 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-title leading-none text-[22px] font-bold tracking-wide pt-1">{title}</h2>
          <IconButton
            icon={CloseIcon}
            className="w-8 h-8 bg-secondary-700 p-1.5 ml-1"
            onClick={onCloseDialog}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SimpleDialog;
