import { ReactNode, createContext, useReducer } from "react";
import { AuthAction, AuthContextType, AuthState } from "../utils/Types";
import { AuthActions } from "../utils/Actions";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  dispatch: () => undefined,
});

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActions.LOGIN:
      return {
        user: action.payload,
      };
    case AuthActions.LOGOUT: {
      return {
        user: null,
      };
    }
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("AuthContextProvider: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
