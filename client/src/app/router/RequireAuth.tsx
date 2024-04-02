import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import { toast } from "react-toastify";

interface Props {
  roles?: string[];
}

export default function RequireAuth({ roles }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user) {
    toast.error("You need to be logged in to do that!");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}