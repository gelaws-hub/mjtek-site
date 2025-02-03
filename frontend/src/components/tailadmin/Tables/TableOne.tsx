import { cn } from "@/lib/utils";
import { BRAND } from "@/types/brand";
import Image from "next/image";

// Sample data from backend
const data = [
  {
    name: "fadhil",
    total_orders: 3,
    total_income: "25725000",
  },
  {
    name: "Aditya Akbar Subakti",
    total_orders: 1,
    total_income: "8775000",
  },
];

const TableOne = ({
  data,
  title,
  className,
}: {
  data: Array<Record<string, any>>;
  title?: string;
  className?: string;
}) => {
  // Extract headers from the keys of the first object
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default scrollbar-thin dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1",
        className,
      )}
    >
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {title}
      </h4>

      <table className="w-full border-collapse border-spacing-0 text-left">
        <thead>
          <tr className="bg-gray-2 dark:bg-meta-4">
            <th className="p-2.5 text-left text-sm font-medium xsm:text-base xl:p-5">
              No
            </th>
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-2.5 text-left text-sm font-medium uppercase xsm:text-base xl:p-5"
              >
                {header.replace(/_/g, " ")}{" "}
                {/* Replace underscores with spaces */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex !== data.length - 1
                  ? "border-b border-stroke dark:border-strokedark"
                  : ""
              }
            >
              <td className="p-2.5 text-center text-black dark:text-white xl:p-5">
                {rowIndex + 1} {/* Row number */}
              </td>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="truncate whitespace-nowrap p-2.5 text-left text-black dark:text-white xl:p-5"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOne;
