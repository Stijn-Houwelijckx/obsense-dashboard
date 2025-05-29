import { useAuthToken } from "hooks/useAuthToken";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  const { isAuth } = useAuthToken();

  if (!isAuth) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }

  return <Outlet />;
};

export default RequireAuth;
