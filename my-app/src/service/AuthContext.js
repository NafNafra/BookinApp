import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('utilisateur');
    
    if (storedUser) {
      setUtilisateur(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('utilisateur', JSON.stringify(userData));
    setUtilisateur(userData);
  };

  const logout = () => {
    localStorage.removeItem('utilisateur');
    setUtilisateur(null);
  };

  return (
    <AuthContext.Provider value={{ utilisateur, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
