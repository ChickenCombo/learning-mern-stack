import { ReactNode, createContext, useReducer } from "react";
import { Action, WorkoutsContextType, WorkoutsState } from "../utils/Types";
import { WorkoutActions } from "../utils/Actions";

export const WorkoutsContext = createContext<WorkoutsContextType>({
  workouts: null,
  dispatch: () => undefined,
});

export const workoutsReducer = (state: WorkoutsState, action: Action) => {
  switch (action.type) {
    case WorkoutActions.SET_WORKOUTS:
      return {
        workouts: action.payload,
      };
    case WorkoutActions.CREATE_WORKOUTS:
      return {
        workouts: [action.payload, ...(state.workouts ?? [])],
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
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
