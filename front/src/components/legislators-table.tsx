"use client";

import { ILegislator, useGetLegislators } from "@/hook/use-get-legislators";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaArrowDown, FaSearchengin } from "react-icons/fa6";

const columns: ColumnDef<ILegislator>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="m-1">{row.original.id}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Legislator",
    cell: ({ row }) => {
      return <div className=" m-1">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "supportedBills",
    header: "Supported Bills",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center m-1">
          {row.original.supportedBills}
        </div>
      );
    },
  },
  {
    accessorKey: "opposedBills",
    header: "Opposed Bills",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center m-1">
          {row.original.opposedBills}
        </div>
      );
    },
  },
];

export default function LegislatorsTable() {
  const { data: legislators, isLoading, error } = useGetLegislators();

  const table = useReactTable<ILegislator>({
    columns,
    data: legislators ?? [],
    getCoreRowModel: getCoreRowModel(),
  });
  if (isLoading && !legislators) return <div>Loading...</div>;
  if (error && !legislators) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="mb-2 flex items-center relative">
        <FaSearchengin size={16} className="absolute left-2" />
        <input
          className="input input-info input-sm pl-8"
          placeholder="Buscar"
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <th key={header.id}>
                <div className="flex gap-2 m-1 align-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <FaArrowDown size={16} className="cursor-pointer my-auto" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
