import { Link } from 'react-router-dom';

import IconButton from 'components/@button/IconButton';
import { PlusIcon } from 'components/@icon';

const CreateCollectionButton = () => {
  return (
    <Link className="bg-secondary-800 rounded-lg p-4" to="/collections/create">
      <div className="flex justify-between items-center bg-secondary-700 rounded-lg p-2.5 px-3.5">
        <span className="font-title font-semibold text-lg text-primary-500 pt-0.5">
          Create collection
        </span>
        <IconButton
          icon={PlusIcon}
          className="h-11 w-11 bg-secondary-800 text-primary-500 shadow-md p-2.5"
        />
      </div>
    </Link>
  );
};

export default CreateCollectionButton;
