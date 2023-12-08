import { clamp } from "@/utils/number";
import { MutableRefObject, RefObject, useCallback, useRef, useState } from "react";

export const useDraggingState = (
  viewportRef: RefObject<HTMLDivElement>,
  scrollBarThumbRef: RefObject<HTMLDivElement>,
  scrollHeightRef: MutableRefObject<number>,
  updateThumbPositionToMatchScrollPercentage: () => void,
  passiveStateSetup: () => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const draggingStateViewportTopRef = useRef(0);
  const draggingStateViewportBottomRef = useRef(0);
  const draggingStateViewportHeightRef = useRef(0);

  const draggingStateHandleMousemove = useCallback((event: MouseEvent) => {
    const viewportElement = viewportRef.current;
    if (!viewportElement) return;

    const clientY = clamp(event.clientY, draggingStateViewportTopRef.current, draggingStateViewportBottomRef.current);
    const localOffset = clientY - draggingStateViewportTopRef.current;
    const localOffsetPercentage = localOffset / draggingStateViewportHeightRef.current;

    viewportElement.scrollTop = localOffsetPercentage * scrollHeightRef.current;
    updateThumbPositionToMatchScrollPercentage();
  }, []);

  const draggingStateTeardown = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", draggingStateHandleMousemove);
    window.removeEventListener("mouseup", draggingStateHandleMouseup);
  };

  const draggingStateHandleMouseup = useCallback(() => {
    draggingStateTeardown();
    passiveStateSetup();
  }, []);

  const draggingStateSetup = (e: MouseEvent) => {
    const viewportElement = viewportRef.current;
    const scrollbarThumbElement = scrollBarThumbRef.current;
    if (!viewportElement || !scrollbarThumbElement) return;

    const viewportRect = viewportElement.getBoundingClientRect();
    const scrollBarThumbRect = scrollbarThumbElement.getBoundingClientRect();

    const initialY = e.clientY;
    const thumbY = initialY - scrollBarThumbRect.top;

    const draggingStateViewportTop = viewportRect.top + thumbY;
    const draggingStateViewportBottom = viewportRect.bottom - scrollBarThumbRect.height + thumbY;
    const draggingStateViewportHeight = draggingStateViewportBottom - draggingStateViewportTop;

    draggingStateViewportTopRef.current = draggingStateViewportTop;
    draggingStateViewportBottomRef.current = draggingStateViewportBottom;
    draggingStateViewportHeightRef.current = draggingStateViewportHeight;

    setIsDragging(true);

    window.addEventListener("mousemove", draggingStateHandleMousemove);
    window.addEventListener("mouseup", draggingStateHandleMouseup);
  };

  return { isDragging, draggingStateSetup, draggingStateTeardown };
};
