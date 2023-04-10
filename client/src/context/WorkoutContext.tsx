import { ReactNode, createContext, useReducer } from "react";
import { WorkoutAction, WorkoutsContextType, WorkoutsState } from "../utils/Types";
import { WorkoutActions } from "../utils/Actions";

export const WorkoutsContext = createContext<WorkoutsContextType>({
  workouts: null,
  dispatch: () => undefined,
});

export const workoutsReducer = (state: WorkoutsState, action: WorkoutAction) => {
  switch (action.type) {
    case WorkoutActions.SET_WORKOUTS:
      return {
        workouts: action.payload,
      };
    case WorkoutActions.CREATE_WORKOUTS:
      return {
        workouts: [action.payload, ...(state.workouts ?? [])],
      };
    case WorkoutActions.DELETE_WORKOUT:
      return {
        workouts: state.workouts!.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: [],
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
