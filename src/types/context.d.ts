import { Dispatch, ReactNode, RefObject, SetStateAction } from "react";

declare global {
  type SideTabContext = {
    isOpen: boolean;
    isSideTabRegistered: boolean;
    containerRef: RefObject<HTMLDivElement> | null;
    showSideTab: () => void;
    hideSideTab: () => void;
    registerSideTab: () => void;
    unregisterSideTab: () => void;
  };

  type ModalContext = {
    modal: ReactNode;
    openModal: (props: ReactNode) => void;
    closeModal: () => void;
  };

  type TobBarContext = {
    prevPageURL: string;
    setPrevPageURL: Dispatch<SetStateAction<string>>;
    clearPrevPageURL: () => void;
    pageTitle: string;
    setPageTitle: (props: string) => void;
    clearPageTitle: () => void;
  };

  type StyleCodeContext = {
    filterList: StyleTagOption[];
    addFilterItem: (item: StyleTagOption) => void;
    removeFilterItem: (value: string) => void;
    resetFilterList: () => void;
    styleCodeList: string[];
    addStyleCodeList: (item: string) => void;
    removeStyleCodeList: (value: string) => void;
  };

  type MergeStyleGroupContext = {
    data: DetailMrgGrpList[];
    meta: { colors: string[] };
    setMergeStyle: (payload: DetailMrgGrpList[]) => void;
    updateMergeStyle: ({ target, mergeColor }: { target: DetailMrgGrpList; mergeColor: string }) => void;
    addProd: (payload: DetailMrgGrpList[]) => void;
    deleteProd: (payload: Prod) => void;
  };

  type AllCodeNamesProps = {
    brandCd?: string;
    tempYn?: YN;
  };

  type AllCodeNamesContext = {
    codeNames: Record<AllCds, Option<string>[]>;
    setCodeNameProps: (props?: AllCodeNamesProps) => void;
  };
}
