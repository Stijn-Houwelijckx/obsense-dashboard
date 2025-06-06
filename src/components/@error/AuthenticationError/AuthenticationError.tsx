import errorImage from 'assets/img/error.png';
import { ErrorResponse } from 'types/response.types';

import Button from 'components/@button/Button';

interface Props {
  error: ErrorResponse;
  handleErrorReset: () => void;
}

const AuthenticationError = ({ error, handleErrorReset }: Props) => {
  return (
    <div className="min-h-dvh w-full flex flex-col justify-center items-center px-10 sm:w-2/3 sm:m-auto">
      <h2 className="font-title font-medium text-2xl text-center mb-8 sm:text-3xl sm:mb-10">{error.message}</h2>
      <img className="w-1/2" src={errorImage} alt="Error Image" />
      <div className="flex flex-col items-center gap-4 mt-3.5 sm:gap-6 sm:mt-5">
        <span className="uppercase text-xs text-neutral-200 bg-secondary-800 px-2.5 py-1.5 rounded-md tracking-wider sm:text-sm">
          {error.status} {error.code}
        </span>
        {error.data?.details && (
          <p className="text-sm text-neutral-200 p-4 text-center bg-secondary-800 rounded-lg sm:text-base">
            {error.data?.details}
          </p>
        )}
      </div>
      <Button label="Try Again" className="w-full mt-8 sm:mt-12 p-3.5 sm:p-4" onClick={handleErrorReset} />
    </div>
  );
};

export default AuthenticationError;
