import Button from 'components/@button/Button';
import { ChevronLeftIcon, ChevronRightIcon } from 'components/@icon';

import DialogContainer from '../DialogContainer';

interface Props {
  title: string;
  message: string;
  leftButtonLabel: string;
  rightButtonLabel: string;
  onLeftButtonClick: () => void;
  onRightButtonClick: () => void;
  isOpen: boolean;
  onCloseDialog: () => void;
}

const ConfirmDialog = ({
  title,
  message,
  leftButtonLabel,
  rightButtonLabel,
  onLeftButtonClick,
  onRightButtonClick,
  isOpen,
  onCloseDialog,
}: Props) => {
  return (
    <DialogContainer title={title} isOpen={isOpen} onCloseDialog={onCloseDialog}>
      <div className="mt-6 flex flex-col gap-6">
        <p className="text-sm leading-[1.55]">{message}</p>
        <div className="flex justify-between gap-2.5">
          <Button
            label={leftButtonLabel}
            className="h-12 font-semibold text-primary-500/80 bg-secondary-800/50 border border-primary-500/50 p-3 px-3.5"
            labelClassName="leading-none px-2.5"
            leftIcon={ChevronLeftIcon}
            onClick={onLeftButtonClick}
          />
          <Button
            label={rightButtonLabel}
            className="h-12 font-semibold text-primary-500/80 bg-primary-500/20 border border-primary-500/50 p-3 px-3.5"
            labelClassName="leading-none px-2.5"
            rightIcon={ChevronRightIcon}
            onClick={onRightButtonClick}
          />
        </div>
      </div>
    </DialogContainer>
  );
};

export default ConfirmDialog;
