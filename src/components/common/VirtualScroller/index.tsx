import { Box, BoxProps } from "@parte-ds/ui";
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDraggingState } from "./useDraggingState";
import { usePassiveState } from "./usePassiveState";

const VirtualScroller = ({ children, width, ...props }: PropsWithChildren<BoxProps & { width: number | string }>) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const scrollBarThumbRef = useRef<HTMLDivElement>(null);

  const viewportHeightRef = useRef(0);
  const contentHeightRef = useRef(0);
  const scrollHeightRef = useRef(0);
  const scrollBarHeightRef = useRef(0);
  const [scrollBarThumbHeight, dispatchSetScrollBarThumbHeight] = useState(0);
  const scrollBarThumbHeightRef = useRef(0);

  const setScrollBarThumbHeight = (height: number) => {
    dispatchSetScrollBarThumbHeight(height);
    scrollBarThumbHeightRef.current = height;
  };

  const [offset, setOffset] = useState(0);

  const getScrollTop = () => viewportRef.current?.scrollTop ?? 0;
  const calculateViewportScrollPercentage = (scrollTop: number, scrollHeight: number) => (scrollHeight ? scrollTop / scrollHeight : 0);

  const updateThumbPositionToMatchScrollPercentage = useCallback(() => {
    const scrollTop = getScrollTop();
    const scrollHeight = scrollHeightRef.current;
    const scrollBarHeight = scrollBarHeightRef.current;

    const scrollPercentage = calculateViewportScrollPercentage(scrollTop, scrollHeight);

    const offset = (scrollBarHeight - scrollBarThumbHeightRef.current) * scrollPercentage;
    setOffset(offset);
  }, []);

  const handleScrollBarMousedown = (event: MouseEvent) => {
    const scrollbarThumbEl = scrollBarThumbRef.current;
    if (!scrollbarThumbEl) return;
    event.preventDefault();

    if (event.target === scrollbarThumbEl) {
      draggingStateSetup(event);
    } else {
      // pagingStateSetup(event);
    }
  };

  const { passiveStateSetup, passiveStateTeardown } = usePassiveState(
    viewportRef,
    scrollBarRef,
    scrollBarThumbRef,
    viewportHeightRef,
    contentHeightRef,
    scrollHeightRef,
    scrollBarHeightRef,
    setScrollBarThumbHeight,
    updateThumbPositionToMatchScrollPercentage,
    handleScrollBarMousedown
  );
  const { isDragging, draggingStateSetup, draggingStateTeardown } = useDraggingState(
    viewportRef,
    scrollBarThumbRef,
    scrollHeightRef,
    updateThumbPositionToMatchScrollPercentage,
    passiveStateSetup
  );

  useEffect(() => {
    passiveStateSetup();

    const contentEl = contentRef.current;
    if (!contentEl) return;

    const observer = new ResizeObserver(() => {
      passiveStateTeardown();
      passiveStateSetup();
    });
    observer.observe(contentEl);

    window.addEventListener("resize", passiveStateSetup);
    return () => {
      passiveStateTeardown();
      draggingStateTeardown();
      // pagingStateTeardown()
      observer.disconnect();
      window.removeEventListener("resize", passiveStateSetup);
    };
  }, []);

  const widthStyle = { width: typeof width === "number" ? `${width}px` : width };

  return (
    <Scroller ref={scrollerRef} style={widthStyle}>
      <Viewport ref={viewportRef}>
        <Content ref={contentRef} style={widthStyle} {...props}>
          {children}
        </Content>
      </Viewport>
      <ScrollBar ref={scrollBarRef} $isDragging={isDragging}>
        <ScrollBarThumb
          ref={scrollBarThumbRef}
          style={{
            height: `${scrollBarThumbHeight}px`,
            transform: `translateY(${offset}px)`,
          }}
        />
      </ScrollBar>
    </Scroller>
  );
};
export default VirtualScroller;

const ScrollBar = styled.div<{ $isDragging?: boolean }>`
  bottom: 0px;
  opacity: 0;
  position: absolute;
  right: 0px;
  top: 0px;
  transition: opacity 150ms ease;
  user-select: none;
  width: 20px;
  z-index: 2;

  ${({ $isDragging }) => $isDragging && "opacity: 1"}
`;

const Scroller = styled.div`
  display: block;
  height: 100%;
  overflow: hidden;
  overscroll-behavior: contain;
  position: relative;

  &:hover {
    ${ScrollBar} {
      opacity: 1;
    }
  }
`;

const Viewport = styled.div`
  bottom: 0px;
  left: 0px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-right: 50px;
  position: absolute;
  right: -50px; // --- THIS IS WHAT RENDERS THE SCROLLBAR OFF SCREEN. ---
  top: 0px;

  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const Content = styled(Box)`
  /* overflow-x: auto; */
`;

const ScrollBarThumb = styled.div`
  left: 0px;
  position: absolute;
  top: 0px;
  width: 20px;

  &:before {
    background-color: hsla(0, 0%, 80%, 0.8);
    border-radius: 20px 20px 20px 20px;
    bottom: 4px;
    content: "";
    left: 8px;
    position: absolute;
    top: 4px;
    transition: background-color 150ms ease;
    width: 8px;
  }
`;
