import { IHeaderParams } from "ag-grid-community";
import { useRef } from "react";

export default function ColumnMenu(props: IHeaderParams) {
  const refButton = useRef<HTMLDivElement>(null);

  const onMenuClicked = () => {
    if (refButton.current) props.showColumnMenu(refButton.current);
  };

  return props.enableMenu ? (
    <div ref={refButton} className="ag-header-icon ag-header-cell-menu-button" onClick={() => onMenuClicked()}>
      <span className="ag-icon ag-icon-menu" role="presentation" />
    </div>
  ) : null;
}
