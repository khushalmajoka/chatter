/* eslint-disable react/prop-types */
import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [darkMode, setDarkMode] = useState(!localStorage.getItem("darkMode"));

  const updateUser = useCallback((userInfo) => {
    setUser(userInfo);
  }, []);

  const updateDarkMode = useCallback((darkMode) => {
    setDarkMode(darkMode);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        darkMode,
        updateDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
