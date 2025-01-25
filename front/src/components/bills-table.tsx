"use client";

import { IBill, useGetBills } from "@/hook/use-get-bills";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaArrowDown, FaSearchengin } from "react-icons/fa6";

const columns: ColumnDef<IBill>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <div className="m-1">{row.original.id}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Bill",
    cell: ({ row }) => {
      return <div className="m-1">{row.original.title}</div>;
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

  const table = useReactTable<IBill>({
    columns,
    data: bills ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading && !bills) return <div>Loading...</div>;
  if (error && !bills) return <div>Error: {error.message}</div>;

  console.log(bills);
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
                <div className="flex gap-2 m-1">
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
