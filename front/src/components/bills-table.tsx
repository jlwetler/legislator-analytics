"use client";

import { IBill, useGetBills } from "@/hook/use-get-bills";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { FaSearchengin } from "react-icons/fa6";

const columns: ColumnDef<IBill>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="m-1 w-20">{row.original.id}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Bill",
    cell: ({ row }) => {
      return <div className="m-1 w-96">{row.original.title}</div>;
    },
  },
  {
    accessorKey: "supporters",
    header: "Supporters",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center m-1">{row.original.supporters}</div>
      );
    },
  },
  {
    accessorKey: "opposers",
    header: "Opposers",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center m-1">{row.original.opposers}</div>
      );
    },
  },
  {
    accessorKey: "primarySponsor",
    header: "Primary Sponsor",
    cell: ({ row }) => {
      return <div className="m-1">{row.original.primarySponsor}</div>;
    },
  },
];

export default function BillsTable() {
  const { data: bills, isLoading, error } = useGetBills();
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable<IBill>({
    columns,
    data: bills ?? [],
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading && !bills) return <div>Loading...</div>;
  if (error && !bills) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="font-bold text-4xl">Bills</div>
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
          <tr className="rounded-t-lg border-2">
            {table.getHeaderGroups()[0].headers.map((header) => (
              <th key={header.id}>
                <div className="flex gap-2 m-1">
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
