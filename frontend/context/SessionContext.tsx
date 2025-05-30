"use client"

import React, { createContext, useContext, useEffect, useState } from "react";

interface SessionContextType {
  isLoggedIn: boolean;
  user: any | null;
  login: (userData: any) => void;
  logout: () => void;
  loading: boolean
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// This is used in the middleware
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

  
export const SessionProvider  = ({children}: { children: React.ReactNode}) =>  {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState< null | string >('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // @ts-ignore
    const storedUser = JSON.parse(sessionStorage.getItem("user"))
    console.log("The useeffect effect runs:", storedUser)
    if(storedUser){
      setUser(storedUser)
      setIsLoggedIn(true)
    }
    setLoading(false)
  },[])

  const login = (userData: any) => {
    setIsLoggedIn(true)
    setUser(userData)
    if (user !== null) sessionStorage.setItem("user", JSON.stringify(userData));
  }

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem("user")
  }

  return (
    <SessionContext.Provider value={{ isLoggedIn, user, login, logout , loading,}}>
    {children}
  </SessionContext.Provider>
  )
  
};