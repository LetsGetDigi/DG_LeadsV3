import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImluZm9AbGV0c2dldGRpZ2kuY29tIiwiaWF0IjoxNjc5MzUxOTczfQ.o8f1Ge1Mw5XnFHwxPLewuzoJh81crwU8KhGDOkBZ1VM");
  const [data, set] = useState(null);
  const [ip, setIp] = useState("http://localhost:8080");

  const login = (newToken) => {
    setToken(newToken);
  };
  const logout = () => {
    setToken(null);
  };
  const setData = (data) => {
    set(data);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, setData, data, ip }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
