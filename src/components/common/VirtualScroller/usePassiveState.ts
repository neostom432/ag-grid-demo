import { MutableRefObject, RefObject } from "react";

const MIN_SCROLL_BAR_HEIGHT = 20;
const PASSIVE: AddEventListenerOptions = { passive: true };

export const usePassiveState = (
  viewportRef: RefObject<HTMLDivElement>,
  scrollBarRef: RefObject<HTMLDivElement>,
  scrollBarThumbRef: RefObject<HTMLDivElement>,
  viewportHeightRef: MutableRefObject<number>,
  contentHeightRef: MutableRefObject<number>,
  scrollHeightRef: MutableRefObject<number>,
  scrollBarHeightRef: MutableRefObject<number>,
  setScrollBarThumbHeight: (height: number) => void,
  updateThumbPositionToMatchScrollPercentage: () => void,
  passiveStateHandleScrollbarMousedown: (e: MouseEvent) => void
) => {
  const passiveStateSetup = () => {
    const viewportElement = viewportRef.current;
    const scrollbarElement = scrollBarRef.current;
    const scrollbarThumbElement = scrollBarThumbRef.current;

    if (!viewportElement || !scrollbarElement || !scrollbarThumbElement) return;
    const viewportHeight = viewportElement.clientHeight;
    const contentHeight = viewportElement.scrollHeight;
    const scrollHeight = contentHeight - viewportHeight;
    const scrollBarHeight = scrollbarElement.clientHeight;
    const scrollBarThumbHeight = scrollHeight ? Math.max((viewportHeight / contentHeight) * scrollBarHeight, MIN_SCROLL_BAR_HEIGHT) : 0;

    viewportHeightRef.current = viewportHeight;
    contentHeightRef.current = scrollHeight;
    scrollHeightRef.current = contentHeight - viewportHeight;
    scrollBarHeightRef.current = scrollBarHeight;
    setScrollBarThumbHeight(scrollBarThumbHeight);

    viewportElement.addEventListener("scroll", updateThumbPositionToMatchScrollPercentage, PASSIVE);
    scrollbarElement.addEventListener("mousedown", passiveStateHandleScrollbarMousedown);
  };

  const passiveStateTeardown = () => {
    const viewportElement = viewportRef.current;
    const scrollbarElement = scrollBarRef.current;
    if (!viewportElement || !scrollbarElement) return;
    viewportElement.removeEventListener("scroll", updateThumbPositionToMatchScrollPercentage, PASSIVE);
    scrollbarElement.removeEventListener("mousedown", passiveStateHandleScrollbarMousedown);
  };

  return {
    passiveStateSetup,
    passiveStateTeardown,
  };
};
