import { useToggleCollectionPublish } from 'queries/collections/useToggleCollectionPublish';
import { useUpdateCollection } from 'queries/collections/useUpdateCollection';
import { useUpdateCollectionObjects } from 'queries/collections/useUpdateCollectionObjects';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollectionGeneralFormData, CollectionItem, CollectionItemFormData } from 'types/collection.types';
import { DialogTarget } from 'types/dialog.types';
import { isCollectionEdited } from 'utils/isCollectionEdited';

import ConfirmDialog from 'components/@dialog/ConfirmDialog';

import CollectionEditGeneralStep from '../CollectionEditGeneralStep';
import CollectionEditObjectsStep from '../CollectionEditObjectsStep';
import CollectionEditPanel from '../CollectionEditPanel';
import CollectionEditPublishStep from '../CollectionEditPublishStep';

interface Props {
  collection: CollectionItem;
  currentEditStep: number;
  setCurrentEditStep: (step: number | ((prev: number) => number)) => void;
  setIsEditMode: (isEditMode: boolean) => void;
}

const CollectionDetailsEdit = ({ collection, currentEditStep, setCurrentEditStep, setIsEditMode }: Props) => {
  const navigate = useNavigate();
  const { updateCollection } = useUpdateCollection();
  const { updateCollectionObjects } = useUpdateCollectionObjects();
  const { toggleCollectionPublish } = useToggleCollectionPublish();

  const [saveEditsTarget, setSaveEditsTarget] = useState<DialogTarget | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const [isEdited, setIsEdited] = useState(false);

  const [formData, setFormData] = useState<CollectionGeneralFormData | null>(null);
  const [formErrors, setFormErrors] = useState(false);

  const [selectedObjects, setSelectedObjects] = useState<CollectionItemFormData['objects']>([]);

  const handleFormDataChange = useCallback(() => {
    if (!formData) return;
    setIsEdited(isCollectionEdited(collection, formData));
  }, [collection, formData]);

  useEffect(() => {
    handleFormDataChange();
  }, [handleFormDataChange]);

  const handleEditStepClick = (step: number) => {
    if (isEdited) {
      setIsConfirmDialogOpen(true);
      setSaveEditsTarget({ target: 'step', step });
    } else {
      setCurrentEditStep(step);
    }
  };

  const handleBackClick = () => {
    if (isEdited) {
      setIsConfirmDialogOpen(true);
      setSaveEditsTarget({ target: 'back' });
    } else {
      if (currentEditStep === 1) {
        navigate(-1);
      } else {
        setCurrentEditStep((prev) => prev - 1);
      }
    }
  };

  const handleReadClick = () => {
    if (isEdited) {
      setIsConfirmDialogOpen(true);
      setSaveEditsTarget({ target: 'read' });
    } else {
      setIsEditMode(false);
    }
  };

  const handleSaveGeneral = () => {
    if (!formData) return;

    // Voeg de form data toe (zonder coverImage)
    const collectionFormData = new FormData();
    const { coverImage, ...collectionData } = formData;
    collectionFormData.append('collection', JSON.stringify({ collection: collectionData }));

    // Als er een nieuwe cover image is, voeg deze toe aan de FormData
    if (coverImage) {
      collectionFormData.append('coverImage', coverImage);
    }

    updateCollection(
      { id: collection._id, collection: collectionFormData },
      {
        onSuccess: () => {
          setIsEdited(false);
          if (saveEditsTarget) {
            handleSaveEditsTarget();
          } else {
            setCurrentEditStep((prev) => prev + 1);
          }
        },
      },
    );
  };

  const handleSaveObjects = () => {
    if (!selectedObjects) return;

    updateCollectionObjects(
      { id: collection._id, objects: { objects: { objectIds: selectedObjects } } },
      {
        onSuccess: () => {
          setIsEdited(false);
          if (saveEditsTarget) {
            handleSaveEditsTarget();
          } else {
            setCurrentEditStep((prev) => prev + 1);
          }
        },
      },
    );
  };

  const handleSavePublish = () => {
    toggleCollectionPublish(
      { id: collection._id },
      {
        onSuccess: () => {
          setIsEdited(false);
          navigate('/collections');
        },
      },
    );
  };

  const handleSaveEdits = () => {
    if (currentEditStep === 1) {
      handleSaveGeneral();
    } else if (currentEditStep === 2) {
      handleSaveObjects();
    } else if (currentEditStep === 3) {
      handleSavePublish();
    }
  };

  const handleSaveEditsTarget = () => {
    if (!saveEditsTarget) return;

    if (saveEditsTarget.target === 'step') {
      setCurrentEditStep(saveEditsTarget.step!);
    } else if (saveEditsTarget.target === 'read') {
      setIsEditMode(false);
    } else if (saveEditsTarget.target === 'back') {
      if (currentEditStep === 1) {
        navigate(-1);
      } else {
        setCurrentEditStep((prev) => prev - 1);
      }
    }
    setSaveEditsTarget(null);
    setIsConfirmDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsConfirmDialogOpen(false);
    setSaveEditsTarget(null);
  };

  return (
    <>
      <CollectionEditPanel
        collectionId={collection._id}
        isEdited={isEdited}
        hasErrors={formErrors}
        currentEditStep={currentEditStep}
        onEditStepClick={handleEditStepClick}
        onSaveEdits={handleSaveEdits}
        onReadClick={handleReadClick}
      />
      {currentEditStep === 1 && (
        <CollectionEditGeneralStep
          collection={collection}
          setFormData={setFormData}
          setFormErrors={setFormErrors}
          onBackClick={handleBackClick}
          onSaveEdits={handleSaveEdits}
        />
      )}
      {currentEditStep === 2 && (
        <CollectionEditObjectsStep
          collectionId={collection._id}
          setIsEdited={setIsEdited}
          setSelectedObjects={setSelectedObjects}
          onBackClick={handleBackClick}
          onSaveEdits={handleSaveEdits}
        />
      )}
      {currentEditStep === 3 && (
        <CollectionEditPublishStep
          collection={collection}
          onBackClick={handleBackClick}
          onSaveEdits={handleSaveEdits}
        />
      )}
      <ConfirmDialog
        title="Edits not saved..."
        message="You have unsaved edits. Do you want to save them before leaving this page?"
        leftButtonLabel="Cancel"
        rightButtonLabel="Save edits"
        onLeftButtonClick={handleCloseDialog}
        onRightButtonClick={handleSaveEdits}
        isOpen={isConfirmDialogOpen}
        onCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default CollectionDetailsEdit;
