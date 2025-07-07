"use client";
import React, { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./RmaxGrid.css";
import { RmaxGridProps } from "../component-interface";

ModuleRegistry.registerModules([AllCommunityModule]);

const RmaxGrid: React.FC<RmaxGridProps> = ({
  columns,
  rows,
  height = 400,
  agGridProps = {},
}) => {
  const gridRef = useRef<any>(null);

  const columnDefs = useMemo(() => {
    if (!columns) return [];
    return [
      {
        headerName: "",
        field: "__checkbox__",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        pinned: "left",
        width: 52,
        maxWidth: 52,
        minWidth: 52,
        suppressMenu: true,
        sortable: false,
        filter: false,
        resizable: false,
        cellClass: "ag-checkbox-cell",
        headerClass: "ag-checkbox-header",
      },
      ...columns.map((col) => ({
        ...col,
        sortable: false,
        filter: false,
        resizable: false,
        headerClass: "ag-header-cell",
        cellClass: "ag-cell",
      })),
    ];
  }, [columns]);

  // Row class rules for selection/hover
  const getRowClass = (params: any) => {
    if (params.node.isSelected()) return "rmax-row-selected";
    if (params.node.hovered) return "rmax-row-hover";
    return "";
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rows}
          columnDefs={columnDefs}
          rowHeight={52}
          headerHeight={52}
          theme="legacy"
          rowSelection="multiple"
          getRowClass={getRowClass}
          suppressCellFocus={true}
          domLayout="autoHeight"
          {...agGridProps}
        />
      </div>
    </div>
  );
};

export default RmaxGrid;
