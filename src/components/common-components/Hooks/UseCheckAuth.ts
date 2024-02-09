import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Helpers/IsAuthenticated";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function useCheckAuth() {
  const navigate = useNavigate();
  const activeMenu = useSelector((state: RootState) => state.friendsMenu.value);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!user) {
      return;
    }
    isAuthenticated().then((authenticated) => {
      if (!authenticated) {
        navigate("/");
      }
    });
  }, [activeMenu]);

  return;
}

export default useCheckAuth;
