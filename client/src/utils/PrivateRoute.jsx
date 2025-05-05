import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const PrivateRoute = ({ element }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  if (!user || !accessToken) {
    navigate("/login");
    return null;
  }

  return element;
};
