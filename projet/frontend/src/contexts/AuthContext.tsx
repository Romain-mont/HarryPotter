import { createContext, useContext, useState } from 'react';

import type { Wizard } from '../@types/wizard';

type AuthContextType = {
  isAuthenticated: boolean;
  isStaff: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<Wizard|null>;
  logout: () => void;
}

type AuthContextProviderProps = {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  
  const login = async (email: string, password: string): Promise<Wizard|null> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      
      if (!response.ok) throw new Error('Erreur lors de la connexion.');

      const data = await response.json();
      
      if (data) {
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
        setToken(data.token);

        return data.wizard;
      }
    } 
    catch (err) {
      console.error(err);
    }
    
    return null;
  };
  
  const logout = async () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsStaff(false);
    setToken(null);

    return true;
  };
  
  return (
    <AuthContext.Provider value={{ token, isAuthenticated, isStaff, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuthContext doit être utilisé dans AuthContextProvider'
    );
  }

  return context;
}
