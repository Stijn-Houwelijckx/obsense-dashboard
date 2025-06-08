import { Link } from 'react-router-dom';

import IconButton from 'components/@button/IconButton';
import { PlusIcon } from 'components/@icon';

interface Props {
  to: string;
  label: string;
}

const CreateButton = ({ to, label }: Props) => {
  return (
    <Link className="bg-secondary-800 rounded-lg p-4" to={to}>
      <div className="flex justify-between items-center bg-secondary-700 rounded-lg p-2.5 px-3.5">
        <span className="font-title font-semibold text-lg text-primary-500 pt-0.5">{label}</span>
        <IconButton
          icon={PlusIcon}
          className="h-11 w-11 text-primary-500 bg-secondary-800 border-2 border-primary-500/20 shadow-md p-1.5"
        />
      </div>
    </Link>
  );
};

export default CreateButton;
