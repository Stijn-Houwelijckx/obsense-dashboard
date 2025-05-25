import LogoButton from "components/@button/LogoButton";
import { AppleIcon, FacebookIcon, GoogleIcon } from "components/@icon";

const AuthenticationProviders = () => {
  return (
    <div className="flex gap-2.5 mt-5 sm:mt-6">
      <LogoButton icon={GoogleIcon} />
      <LogoButton icon={AppleIcon} />
      <LogoButton icon={FacebookIcon} />
    </div>
  );
};

export default AuthenticationProviders;
