import { PropsWithChildren, createContext, useState } from "react";

export const TopBarContext = createContext<TobBarContext | null>(null);

export const TopBarContextProvider = ({ children }: PropsWithChildren) => {
  const [prevPageURL, setPrevPageURL] = useState<string>("");
  const [pageTitle, setPageTitle] = useState<string>("");

  return (
    <TopBarContext.Provider
      value={{
        prevPageURL,
        setPrevPageURL,
        clearPrevPageURL: () => setPrevPageURL(""),
        pageTitle,
        setPageTitle,
        clearPageTitle: () => setPageTitle(""),
      }}
    >
      {children}
    </TopBarContext.Provider>
  );
};
