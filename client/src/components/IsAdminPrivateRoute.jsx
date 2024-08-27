import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function IsAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
