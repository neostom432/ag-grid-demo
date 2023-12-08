import { ReactNode, PropsWithChildren, createContext, useState } from "react";

export const ModalContext = createContext<ModalContext | null>(null);

const EMPTY_COMPONENT = () => <></>;

export const ModalContextProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ReactNode>(EMPTY_COMPONENT);

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal: setModal,
        closeModal: () => setModal(EMPTY_COMPONENT),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
