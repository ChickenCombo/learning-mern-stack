import { AuthActions, WorkoutActions } from "../utils/Actions";
import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem("user");

    authDispatch({ type: AuthActions.LOGOUT });
    workoutsDispatch({ type: WorkoutActions.SET_WORKOUTS, payload: [] });
  };

  return { logout };
};
