import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthenticationContainer = ({ children }: Props) => {
  return (
    <div className="min-h-dvh flex flex-col justify-between items-center sm:justify-start">
      {children}
    </div>
  );
};

export default AuthenticationContainer;
