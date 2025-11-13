// context/AvisoContext.js
import { createContext, useState } from "react";

export const AvisoContext = createContext();

export function AvisoProvider({ children }) {
  const [avisoMostrado, setAvisoMostrado] = useState(false);

  return (
    <AvisoContext.Provider value={{ avisoMostrado, setAvisoMostrado }}>
      {children}
    </AvisoContext.Provider>
  );
}