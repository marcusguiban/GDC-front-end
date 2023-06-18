import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

 const AuthContextProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");

  const sharedResources = {
    isAuthenticated,
    token,
    setIsAuthenticated,
    setToken,
  };

  return (
    <AuthContext.Provider value={sharedResources}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider