import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { AuthActions } from "../utils/Actions";

export const useSignup = () => {
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);

  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setIsError(null);

    const response = await fetch("http://localhost:5000/api/user/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setIsError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: AuthActions.LOGIN, payload: json });

      setIsLoading(false);
      setIsError(null);
    }
  };

  return { signup, isError, isLoading };
};
