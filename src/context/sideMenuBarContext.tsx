import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

export const SideMenuBarContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | null>(null);

export const SideMenuBarProvider = ({ children }: PropsWithChildren) => {
  const stateAndDispatch = useState(false);

  return <SideMenuBarContext.Provider value={stateAndDispatch}>{children}</SideMenuBarContext.Provider>;
};
