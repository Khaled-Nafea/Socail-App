import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
    const [token, setToken] = useState(null);
    const localStorageToken = localStorage.getItem("userToken");
    useEffect(() => {
        if (localStorageToken) {
            setToken(localStorageToken);
        }
    }, []);
  return (
    <AuthContext.Provider value={{token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}
