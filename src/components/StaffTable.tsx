import React, { useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import type StaffTableColumn from "~/interfaces/StaffTableColumn";
import type StaffTableData from "~/interfaces/StaffTableData";
import { StaffTableType } from "~/enums/StaffTableType";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function StaffTable({ columns, datas, type }: { columns: Array<StaffTableColumn>; datas: Array<StaffTableData>; type: StaffTableType }) {
  const resource = getResource();

  function getResource() {
    if (type === StaffTableType.TeamMember) {
      return "teamMember";
    } else if (type === StaffTableType.BlogPost) {
      return "blog";
    }
  }

  const visibilityCallback = useCallback(async (id: number, visible: boolean) => {
    const response = await fetch(`/api/staff/${resource}/visibility`, {
      method: "POST",
      body: JSON.stringify({
        id,
        visible: !visible,
      }),
    });

    if (response.ok) {
      window.location.reload();
    }
  }, [resource]);

  const editCallback = useCallback((id: number) => {
    window.location.href = `/staff/${resource}/edit/${id}`;
  }, [resource]);

  const deleteCallback = useCallback(async (id: number) => {
    const response = await fetch(`/api/staff/${resource}/delete`, {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });

    if (response.ok) {
      window.location.reload();
    }
  }, [resource]);

  const pinnedCallback = useCallback(async (id: number, pinned: boolean) => {
    const response = await fetch(`/api/staff/${resource}/pinned`, {
      method: "POST",
      body: JSON.stringify({
        id,
        pinned: !pinned,
      }),
    });

    if (response.ok) {
      window.location.reload();
    }
  }, [resource]);	

  const renderCell = React.useCallback((data: StaffTableData, columnKey: string): React.ReactNode => {
    const cellValue = data[columnKey];

    switch (columnKey) {
      case "value":
        return cellValue as string;
      case "visible":
        return (
          <Chip className="capitalize" color={getKeyValue(statusColorMap, data.visible.toString()) as "success" | "danger"} size="sm" variant="flat">
            {data.visible ? "visible" : "hidden"}
          </Chip>
        );
      case "pinned":
        return (
          <Chip 
          className="capitalize hover:cursor-pointer" 
          color={getKeyValue(statusColorMap, (data.pinned as boolean).toString()) as "success" | "danger"} 
          size="sm" 
          variant="flat"
          onClick={() => { pinnedCallback(data.id, data.pinned as boolean) }}
          >
            {data.pinned ? "pinned" : "unpinned"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Toggle Visibility">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => { void visibilityCallback(data.id, data.visible) }}>
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => { editCallback(data.id) }}>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { void deleteCallback(data.id) }}>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue as string;
    }
    // Keep an eye on this, might cause problems.
  }, [editCallback, deleteCallback, visibilityCallback]);

  return (
    <Table aria-label="Staff Table">
      <TableHeader columns={columns}>
        {(column: StaffTableColumn) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={datas}>
        {(item: StaffTableData) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
