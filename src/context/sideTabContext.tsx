import { PropsWithChildren, Reducer, createContext, useMemo, useReducer, useRef } from "react";

export const SideTabContext = createContext<SideTabContext | null>(null);

type Props = PropsWithChildren;

// sideTab의 등록시점과 호출시점이 다름!
// 등록 > 각 페이지가 그려질때나 특정 이벤트가 발생했을때 사이드탭의 내용을 등록함 ex) url변경, 버튼 클릭
// 호출 > 사이드탭을 화면에 표현 ex) url변경, 버튼 클릭, top bar의 오른쪽에있는 아이콘이 눌림 (>>)

type SideTabState = {
  isSideTabRegistered: boolean;
  isOpen: boolean;
};

type RegisterSideTab = { type: "regitser_sidetab" };
type UnregisterSideTab = { type: "unregister_sidetab" };
type OpenSideTab = { type: "open_sidetab" };
type CloseSideTab = { type: "close_sidetab" };
type SideTabAction = RegisterSideTab | UnregisterSideTab | OpenSideTab | CloseSideTab;

const sideTabReducer: Reducer<SideTabState, SideTabAction> = (state, action) => {
  switch (action.type) {
    case "regitser_sidetab":
      return { isSideTabRegistered: true, isOpen: true };
    case "unregister_sidetab":
      return { isSideTabRegistered: false, isOpen: false };
    case "open_sidetab":
      return { ...state, isOpen: true };
    case "close_sidetab":
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

export const SideTabContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(sideTabReducer, { isSideTabRegistered: false, isOpen: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const value: SideTabContext = useMemo(
    () => ({
      isOpen: state.isOpen,
      isSideTabRegistered: state.isSideTabRegistered,
      containerRef,
      showSideTab: () => dispatch({ type: "open_sidetab" }),
      hideSideTab: () => dispatch({ type: "close_sidetab" }),
      registerSideTab: () => dispatch({ type: "regitser_sidetab" }),
      unregisterSideTab: () => dispatch({ type: "unregister_sidetab" }),
    }),
    [state]
  );

  return <SideTabContext.Provider value={value}>{children}</SideTabContext.Provider>;
};
