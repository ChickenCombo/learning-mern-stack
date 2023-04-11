import { AuthActions } from "../utils/Actions";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: AuthActions.LOGOUT });
  };

  return { logout };
};
