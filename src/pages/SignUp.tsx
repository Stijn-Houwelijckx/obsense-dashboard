import { AxiosError } from 'axios';
import { useFormFields } from 'hooks/useFormFields';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticationService } from 'services/authentication';
import { useAuthStorage } from 'store/authStorage';
import { SignUpFormData } from 'types/auth.types';
import { ErrorResponse } from 'types/response.types';

import AuthenticationContainer from 'components/@auth/AuthenticationContainer';
import AuthenticationContent from 'components/@auth/AuthenticationContent';
import AuthenticationFormTitle from 'components/@auth/AuthenticationFormTitle';
import AuthenticationHeader from 'components/@auth/AuthenticationHeader';
import AuthenticationProviders from 'components/@auth/AuthenticationProviders';
import AuthenticationRedirect from 'components/@auth/AuthenticationRedirect';
import SignUpForm from 'components/@auth/forms/SignUpForm';
import HorizontalDivider from 'components/@common/Divider/HorizontalDivider';
import ProgressBar from 'components/@common/ProgressBar';
import AuthenticationError from 'components/@error/AuthenticationError';

const TOTAL_FORM_STEPS = 3;

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath = location.state?.from ?? '/';

  const { setToken } = useAuthStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setError,
    reset,
    getValues,
  } = useForm<SignUpFormData>();

  const [currentFormStep, setCurrentFormStep] = useState(1);
  const [signUpError, setSignUpError] = useState<ErrorResponse | null>(null);

  const currentFormFields = useFormFields(currentFormStep);

  const handleNextFormStep = async () => {
    if (await trigger(currentFormFields)) {
      setCurrentFormStep((prev) => prev + 1);
    }
  };

  const handlePreviousFormStep = () => {
    setCurrentFormStep((prev) => prev - 1);
  };

  const onSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      const currentValues = getValues();

      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match.',
      });

      reset(
        {
          ...currentValues,
          password: '',
          confirmPassword: '',
        },
        { keepErrors: true },
      );

      return;
    }

    try {
      const userData = {
        isArtist: true,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const response = await authenticationService.signup(userData);

      setToken(response.data.token);
      navigate(targetPath, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.code === 409) {
          const errorMessage = error.response?.data.message.toLowerCase();

          // TODO: change to new error response from API
          if (errorMessage.includes('username')) {
            setError('username', {
              type: 'manual',
              message: 'This username is already in use.',
            });
          } else if (errorMessage.includes('email')) {
            setError('email', {
              type: 'manual',
              message: 'This email is already in use.',
            });
          }
          setCurrentFormStep(2);
        } else {
          setSignUpError(error.response?.data);
        }
      } else {
        setSignUpError({
          status: 'error',
          code: 500,
          message: 'Something went wrong... Please try again.',
        });
      }
    }
  };

  const handleErrorReset = () => {
    setSignUpError(null);
    setCurrentFormStep(1);
    reset();
  };

  return (
    <>
      {signUpError ? (
        <AuthenticationError error={signUpError} handleErrorReset={handleErrorReset} />
      ) : (
        <AuthenticationContainer>
          <AuthenticationHeader
            title="Sign up"
            currentFormStep={currentFormStep}
            onClick={handlePreviousFormStep}
          />
          <AuthenticationContent>
            <AuthenticationFormTitle title="Goodmorning! 👋" />
            <ProgressBar value={currentFormStep} maxValue={TOTAL_FORM_STEPS} />
            <SignUpForm
              currentFormStep={currentFormStep}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={onSubmit}
              handleNextFormStep={handleNextFormStep}
            />
            <HorizontalDivider message="or sign up with" lineClassName="bg-neutral-300/50" />
            <AuthenticationProviders />
            <AuthenticationRedirect
              path="/signin"
              message="Already have an account?"
              action="Sign in!"
            />
          </AuthenticationContent>
        </AuthenticationContainer>
      )}
    </>
  );
};

export default SignUp;
