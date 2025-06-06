import { cn } from 'utils/cn';

import Button from 'components/@button/Button';
import IconButton from 'components/@button/IconButton';
import ProgressBar from 'components/@common/ProgressBar';
import { TrashIcon, ViewIcon } from 'components/@icon';

const STEPS = ['General', '3D-Objects', 'Publish'];

interface Props {
  isEdited: boolean;
  hasErrors: boolean;
  currentEditStep: number;
  onEditStepClick: (step: number) => void;
  onSaveEdits: () => void;
  onReadClick: () => void;
}

const CollectionEditPanel = ({
  isEdited,
  hasErrors,
  currentEditStep,
  onEditStepClick,
  onSaveEdits,
  onReadClick,
}: Props) => {
  return (
    <div className="bg-secondary-800 rounded-lg mb-8 p-4">
      <div className="flex justify-between items-center bg-secondary-700 rounded-lg p-2.5 px-3.5">
        <Button
          label="Save edits"
          disabled={hasErrors || !isEdited}
          onClick={onSaveEdits}
          className={cn(
            'h-12 font-semibold text-sm bg-secondary-800 text-neutral-100/50 border-2 border-neutral-200/20 rounded-lg shadow-md px-5',
            isEdited && !hasErrors && 'text-primary-500 border-primary-500/20 pulse-green',
          )}
        />
        <div className="flex gap-2.5">
          <IconButton
            icon={ViewIcon}
            disabled={hasErrors}
            onClick={onReadClick}
            className={cn(
              'h-11 w-11 bg-secondary-800 text-primary-500 border-2 border-primary-500/20 shadow-md p-2.5',
              hasErrors && 'text-neutral-100/50 border-neutral-200/20',
            )}
          />
          <IconButton
            icon={TrashIcon}
            onClick={() => console.log('delete collection')}
            className="h-11 w-11 bg-secondary-800 text-status-warning border-2 border-status-warning/20 shadow-md p-2.5"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <div className="w-full grid grid-cols-3 text-sm">
          {STEPS.map((step, index) => {
            const currentStepIndex = index + 1;
            const isCurrentStep = currentEditStep === currentStepIndex;
            const isCompletedStep = currentEditStep > currentStepIndex;

            return (
              <Button
                key={index}
                label={step}
                disabled={hasErrors}
                onClick={() => onEditStepClick(currentStepIndex)}
                className={cn(
                  'flex justify-self-center font-normal leading-normal bg-transparent rounded-none px-0.5',
                  index === 0 && 'mr-0.5',
                  index === 2 && 'ml-0.5',
                  isCurrentStep && 'text-primary-500 font-semibold border-b border-primary-500',
                  isCompletedStep && 'text-primary-500/50',
                  !isCurrentStep && !isCompletedStep && 'text-neutral-100/50',
                )}
              />
            );
          })}
        </div>
        <ProgressBar value={currentEditStep} maxValue={STEPS.length} />
      </div>
    </div>
  );
};

export default CollectionEditPanel;
