import { TOP_BAR_HEIGHT } from "@/constants";
import { Box, BoxProps } from "@parte-ds/ui";
import styled from "styled-components";
import FullHeight from "./FullHeight";
import Query from "./Query";
import Scrollable from "./Scrollable";
import Table from "./Table";

type Props = BoxProps & { autoPadding?: boolean };

export default function Layout({ children, autoPadding, ...props }: Props) {
  return <LayoutWrapper {...props}>{children}</LayoutWrapper>;
}

const LayoutWrapper = styled(Box)`
  height: calc(100% - ${TOP_BAR_HEIGHT}px);
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  min-height: 0px;
  min-width: 0px;
`;

// tableTemplate을 감싼다. 높이는 flex:1로 정해져서 테이블 내부에 스크롤이 생성됨
Layout.Table = Table;
// 높이를 100%로 가지고 스크롤을 가지지않을때 사용
Layout.FullHeight = FullHeight;
// 높이를 100%로 가지고 컨텐트가 부모보다 높이가 커질때 스크롤이 생김
Layout.Scrollable = Scrollable;
// 페이지에서 상단 버튼들을 Wrap으로 감쌀때 사용
Layout.Query = Query;
