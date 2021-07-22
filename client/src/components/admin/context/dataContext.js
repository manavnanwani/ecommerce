import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [currentData, setCurrentData] = useState({});
  return (
    <DataContext.Provider value={[currentData, setCurrentData]}>
      {props.children}
    </DataContext.Provider>
  );
};
