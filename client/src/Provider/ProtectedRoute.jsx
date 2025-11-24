import { Navigate } from "react-router-dom";
import { useUser } from "./UserProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/" replace />; // redirect to root login page
  }

  return children; // render protected content if authenticated
};

export default ProtectedRoute;
