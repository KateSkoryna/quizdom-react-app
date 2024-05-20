/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import {
  AuthContextValue
} from "../types/types";

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextValue;
};
