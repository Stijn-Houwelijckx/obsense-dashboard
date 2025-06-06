import { useUpdateCollection } from 'queries/collections/useUpdateCollection';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollectionGeneralFormData, CollectionItem } from 'types/collection.types';
import { DialogTarget } from 'types/dialog.types';
import { isCollectionEdited } from 'utils/isCollectionEdited';

import ConfirmDialog from 'components/@dialog/ConfirmDialog';

import CollectionEditGeneralStep from '../CollectionEditGeneralStep';
import CollectionEditPanel from '../CollectionEditPanel';

interface Props {
  collection: CollectionItem;
  currentEditStep: number;
  setCurrentEditStep: (step: number | ((prev: number) => number)) => void;
  setIsEditMode: (isEditMode: boolean) => void;
}

const CollectionDetailsEdit = ({ collection, setIsEditMode, currentEditStep, setCurrentEditStep }: Props) => {
  const navigate = useNavigate();
  const { updateCollection } = useUpdateCollection();

  const [dialogTarget, setDialogTarget] = useState<DialogTarget | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [isEdited, setIsEdited] = useState(false);

  const [formData, setFormData] = useState<CollectionGeneralFormData | null>(null);
  const [hasFormErrors, setHasFormErrors] = useState(false);

  const handleNextEditStep = () => {
    setCurrentEditStep((prev) => prev + 1);
  };

  const handleEditStepClick = (step: number) => {
    if (isEdited) {
      setIsConfirmDialogOpen(true);
      setDialogTarget({ target: 'step', step });
    } else {
      setCurrentEditStep(step);
    }
  };

  const handleBackClick = () => {
    if (isEdited) {
      setIsConfirmDialogOpen(true);
      setDialogTarget({ target: 'back' });
    } else {
      navigate(-1);
    }
  };

  const handleReadClick = () => {
    if (isEdited) {
      setIsConfirmDialogOpen(true);
      setDialogTarget({ target: 'read' });
    } else {
      setIsEditMode(false);
    }
  };

  const handleSaveEdits = () => {
    if (!formData) return;

    if (isCollectionEdited(collection, formData)) {
      const collectionFormData = new FormData();
      collectionFormData.append(
        'collection',
        JSON.stringify({
          collection: {
            ...formData,
            objects: collection.objects,
            location: collection.location,
            isActive: collection.isActive,
            isPublished: collection.isPublished,
          },
        }),
      );
      updateCollection({ id: collection._id, collection: collectionFormData });
    }
  };

  const handleDialogTarget = () => {
    if (!dialogTarget) return;

    if (dialogTarget.target === 'step') {
      setCurrentEditStep(dialogTarget.step!);
    } else if (dialogTarget.target === 'read') {
      setIsEditMode(false);
    } else if (dialogTarget.target === 'back') {
      navigate(-1);
    }
    setDialogTarget(null);
    setIsConfirmDialogOpen(false);
  };

  const handleDialogSaveEdits = () => {
    handleSaveEdits();
    handleDialogTarget();
  };

  const handleCloseDialog = () => {
    setIsConfirmDialogOpen(false);
    setDialogTarget(null);
  };

  return (
    <>
      <CollectionEditPanel
        collection={collection}
        isEdited={isEdited}
        hasErrors={hasFormErrors}
        currentEditStep={currentEditStep}
        onEditStepClick={handleEditStepClick}
        onSaveEdits={handleSaveEdits}
        onReadClick={handleReadClick}
      />
      <CollectionEditGeneralStep
        collection={collection}
        setIsEdited={setIsEdited}
        onNextEditStep={handleNextEditStep}
        onBackClick={handleBackClick}
        onFormDataChange={setFormData}
        onFormErrorsChange={setHasFormErrors}
      />
      <ConfirmDialog
        title="Edits not saved..."
        message="You have unsaved edits. Do you want to save them before leaving this page?"
        leftButtonLabel="Cancel"
        rightButtonLabel="Save edits"
        onLeftButtonClick={handleCloseDialog}
        onRightButtonClick={handleDialogSaveEdits}
        isOpen={isConfirmDialogOpen}
        onCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default CollectionDetailsEdit;
