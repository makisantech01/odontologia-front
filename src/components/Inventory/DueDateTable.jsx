import React from "react";
import { useTable, Column, useSortBy, HeaderGroup, Cell } from "react-table";
import { productos } from "./fakeData";
import { useMemo } from "react";

const DueDateTable = () => {
  const productosOrdenados = useMemo(() => {
    return [...productos].sort(
      (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
    );
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Nombre",
        accessor: "name",
      },
      {
        Header: "Fecha de vencimiento",
        accessor: "dueDate",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: productosOrdenados,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="max-h-80 w-[100%]  overflow-y-scroll scrollbar-thumb-primary scrollbar-rounded-full rounded-md scrollbar-track-slate-300 scrollbar-thin scrollbar-hide">
      <table {...getTableProps()}>
        <thead className="sticky top-0">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="py-2 px-4 bg-primary text-white font-medium uppercase text-sm border-r border-black"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="bg-slate-300  py-2 px-4 border-b border-black text-sm"
                  >
                    {cell.column.id === "dueDate"
                      ? new Date(cell.value).toLocaleDateString()
                      : cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DueDateTable;
