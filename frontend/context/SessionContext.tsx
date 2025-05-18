import React, { createContext, useContext, useState } from "react";

interface SessionContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export const SessionProvider  = ({children}: { children: React.ReactNode}) =>  {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData: any) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  }

  return (
    <SessionContext.Provider value={{ isLoggedIn, user, login, logout }}>
    {children}
  </SessionContext.Provider>
  )
  

};