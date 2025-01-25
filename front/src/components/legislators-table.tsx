"use client";

import { ILegislator, useGetLegislators } from "@/hook/use-get-legislators";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { FaSearchengin } from "react-icons/fa6";

const columns: ColumnDef<ILegislator>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="m-1 w-20">{row.original.id}</div>;
    },
  },
  {
    accessorKey: "name",
    header: "Legislator",
    cell: ({ row }) => {
      return <div className="m-1 w-96">{row.original.name}</div>;
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
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable<ILegislator>({
    columns,
    data: legislators ?? [],
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  if (isLoading && !legislators) return <div>Loading...</div>;
  if (error && !legislators) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="font-bold text-4xl">Legislators</div>
      <div className="my-3 flex items-center relative">
        <FaSearchengin size={16} className="absolute left-2" />
        <input
          className="w-72 pl-10 py-1 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Buscar"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr className="rounded-lg border-2">
            {table.getHeaderGroups()[0].headers.map((header) => (
              <th key={header.id} className="">
                <div className="flex gap-2 m-1 align-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="rounded-lg border-2">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center mx-auto w-[730px] py-4"
              >
                Nenhum item encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
