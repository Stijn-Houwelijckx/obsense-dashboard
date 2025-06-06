import { useUpdateCollection } from 'queries/collections/useUpdateCollection';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollectionGeneralFormData, CollectionItem } from 'types/collection.types';
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

  const [isEdited, setIsEdited] = useState(false);
  const [hasFormErrors, setHasFormErrors] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [targetStep, setTargetStep] = useState<number | null>(null);
  const [formData, setFormData] = useState<CollectionGeneralFormData | null>(null);

  const handleEditStepClick = (step: number) => {
    if (isEdited) {
      setTargetStep(step);
      setIsConfirmDialogOpen(true);
    } else {
      setCurrentEditStep(step);
    }
  };

  const handleNextEditStep = () => {
    setCurrentEditStep((prev) => prev + 1);
  };

  const handleStepBack = () => {
    if (isEdited) {
      setIsConfirmDialogOpen(true);
    } else {
      navigate(-1);
    }
  };

  const handleCloseDialog = () => {
    setIsConfirmDialogOpen(false);
    setTargetStep(null);
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

  const handleDialogNavigation = () => {
    if (targetStep !== null) {
      setCurrentEditStep(targetStep);
      setTargetStep(null);
    } else {
      navigate(-1);
    }
    setIsConfirmDialogOpen(false);
  };

  const handleSaveEditsNavigate = () => {
    handleSaveEdits();
    handleDialogNavigation();
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
        onReadClick={() => setIsEditMode(false)}
      />
      <CollectionEditGeneralStep
        collection={collection}
        setIsEdited={setIsEdited}
        onNextEditStep={handleNextEditStep}
        onStepBack={handleStepBack}
        onFormDataChange={setFormData}
        onFormErrorsChange={setHasFormErrors}
      />
      <ConfirmDialog
        title="Edits not saved..."
        message="You have unsaved edits. Do you want to save them before leaving this page?"
        leftButtonLabel="Cancel"
        rightButtonLabel="Save edits"
        onLeftButtonClick={handleCloseDialog}
        onRightButtonClick={handleSaveEditsNavigate}
        isOpen={isConfirmDialogOpen}
        onCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default CollectionDetailsEdit;
