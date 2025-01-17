import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      {
        loading && <Loader />;
      }
    }
  }, [isAuthenticated]);

  if (!loading) {
    if (isAdmin && !isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (isAdmin && user.role !== "admin") {
      return <Navigate to="/login" />;
    }
  }
  return children;
};

export default ProtectedRoute;
