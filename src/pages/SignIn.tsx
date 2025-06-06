import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticationService } from 'services/authentication';
import { useAuthStorage } from 'store/authStorage';
import { SignInFormData } from 'types/auth.types';
import { ErrorResponse } from 'types/response.types';

import AuthenticationContainer from 'components/@auth/AuthenticationContainer';
import AuthenticationContent from 'components/@auth/AuthenticationContent';
import AuthenticationFormTitle from 'components/@auth/AuthenticationFormTitle';
import AuthenticationHeader from 'components/@auth/AuthenticationHeader';
import AuthenticationProviders from 'components/@auth/AuthenticationProviders';
import AuthenticationRedirect from 'components/@auth/AuthenticationRedirect';
import SignInForm from 'components/@auth/forms/SignInForm';
import HorizontalDivider from 'components/@common/Divider/HorizontalDivider';
import AuthenticationError from 'components/@error/AuthenticationError';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const targetPath = location.state?.from ?? '/';

  const { setToken } = useAuthStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<SignInFormData>();

  const [signInError, setSignInError] = useState<ErrorResponse | null>(null);

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await authenticationService.login(data);

      setToken(response.data.token);
      navigate(targetPath, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.code === 401) {
          setError('password', {
            type: 'manual',
            message: 'Incorrect email or password.',
          });
        } else {
          setSignInError(error.response?.data);
        }
      } else {
        setSignInError({
          status: 'error',
          code: 500,
          message: 'Something went wrong... Please try again.',
        });
      }
    }
  };

  const handleErrorReset = () => {
    setSignInError(null);
    reset();
  };

  return (
    <>
      {signInError ? (
        <AuthenticationError error={signInError} handleErrorReset={handleErrorReset} />
      ) : (
        <AuthenticationContainer>
          <AuthenticationHeader title="Sign in" />
          <AuthenticationContent>
            <AuthenticationFormTitle title="Welcome again! 👋" />
            <SignInForm register={register} handleSubmit={handleSubmit} errors={errors} onSubmit={onSubmit} />
            <HorizontalDivider message="or sign in with" lineClassName="bg-neutral-300/50" />
            <AuthenticationProviders />
            <AuthenticationRedirect path="/signup" message="Don't have an account?" action="Sign up!" />
          </AuthenticationContent>
        </AuthenticationContainer>
      )}
    </>
  );
};

export default SignIn;
