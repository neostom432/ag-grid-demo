import { InterfaceChevronLeftIcon, StyleFilterAltIcon } from "@parte-ds/icons";
import { Box, BoxProps, Button } from "@parte-ds/ui";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";
import { css, styled } from "styled-components";

type FilterLayoutProps = BoxProps & {
  autoPadding?: boolean;
  startWithOpenFilter?: boolean;
};

const FilterLayoutContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | null>(null);

const FilterLayout = ({ autoPadding, startWithOpenFilter, children, ...boxProps }: FilterLayoutProps) => {
  const tuple = useState(startWithOpenFilter || false);
  const [showFilter] = tuple;

  if (!Array.isArray(children)) {
    throw new Error("FilterLayout children must be array");
  }
  const [buttonBox, filterList, ...restChildren] = children;

  return (
    <FilterLayoutContext.Provider value={tuple}>
      <GridLayout $showFilter={showFilter} {...boxProps}>
        {buttonBox}
        <Box display="flex" minHeight={0} width={showFilter ? "100%" : 0} height="100%" flexShrink={0} style={{ overflowX: "hidden" }}>
          {filterList}
        </Box>
        {restChildren}
      </GridLayout>
    </FilterLayoutContext.Provider>
  );
};
export default FilterLayout;

const ButtonBox = ({ children }: PropsWithChildren) => {
  const stateAndDispatch = useContext(FilterLayoutContext);
  if (!stateAndDispatch) return null;

  const [showFilter, setShowFilter] = stateAndDispatch;
  const FilterToggleButton = (
    <Button
      leadingIcon={showFilter ? <InterfaceChevronLeftIcon color="N600" /> : <StyleFilterAltIcon color="N600" />}
      onClick={() => setShowFilter((prev) => !prev)}
      variant="outline-secondary"
    >
      필터
    </Button>
  );
  if (showFilter)
    return (
      <>
        {FilterToggleButton}
        {children ? children : <div />}
      </>
    );
  return (
    <>
      <Box />
      <Box display="flex" gap={8}>
        {FilterToggleButton}
        {children}
      </Box>
    </>
  );
};
FilterLayout.ButtonBox = ButtonBox;

const WithFilterLayout = css`
  grid-template-columns: fit-content(100%) 1fr;
  gap: 16px;
`;
const TableOnlyLayout = css`
  grid-template-columns: fit-content(100%) 1fr;
  column-gap: 0px;
  row-gap: 16px;
`;
const GridLayout = styled(Box)<{ $showFilter: boolean }>`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: fit-content(100%) 1fr;
  min-height: 0;

  ${({ $showFilter }) => ($showFilter ? WithFilterLayout : TableOnlyLayout)}
`;
