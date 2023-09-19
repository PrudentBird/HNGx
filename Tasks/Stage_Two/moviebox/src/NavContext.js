import React, { createContext, useContext, useState } from 'react';

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <NavContext.Provider value={{ isSearchActive, setIsSearchActive }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  return useContext(NavContext);
};
