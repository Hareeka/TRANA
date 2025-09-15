import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // your user, points, addPoints state here
  const [user, setUser] = useState({ id: 123, name: "Test User" });
  const [points, setPoints] = useState(150);
  const addPoints = (pts) => setPoints(prev => prev + pts);

  return (
    <UserContext.Provider value={{ user, setUser, points, addPoints }}>
      {children}
    </UserContext.Provider>
  );
};

// This custom hook simplifies consuming UserContext
export const useUser = () => {
  return useContext(UserContext);
};
