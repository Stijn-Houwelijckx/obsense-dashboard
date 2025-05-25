import { Link } from "react-router-dom";

interface Props {
  path: string;
  message: string;
  action: string;
}

const AuthenticationRedirect = ({ path, message, action }: Props) => {
  return (
    <div className="flex justify-center pt-12">
      <span className="font-medium text-sm text-neutral-100 lg:text-base">
        {message}{" "}
        <Link
          to={path}
          className="font-bold text-primary-500"
        >
          {action}
        </Link>
      </span>
    </div>
  );
};

export default AuthenticationRedirect;
