import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return children;
  } else {
    return navigate("/admin/register");
  }
};

export default PrivateRoute;
