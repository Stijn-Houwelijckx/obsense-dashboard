import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthenticationContent = ({ children }: Props) => {
  return (
    <div className="w-full sm:w-2/3 sm:m-auto sm:pt-6 sm:pb-12 lg:w-3/5 xl:py-8 xl:max-w-3xl">
      <div className="pt-8 pb-6 px-8 rounded-t-3xl bg-secondary-800 sm:rounded-3xl sm:border-4 sm:border-neutral-500/25">
        {children}
      </div>
    </div>
  );
};

export default AuthenticationContent;
