import React, { useEffect, useState } from "react";
import { MultiSelect } from "./multiSelect";

type Socket = {
  id: number;
  socket_name: string;
  release_date: string;
  description: string;
  brand_id: number;
  brand: {
    id: number;
    brand_name: string;
  };
};

type RamType = {
  id: number;
  ram_type_name: string;
};

type socketRamType = {
  socket: Socket[];
  ram_type: RamType[];
};

export const CompatibilitySelection = ({
  socketIds = [],
  setSocketIds = (value: any) => {},
  ramTypeIds = [],
  setRamTypeIds = (value: any) => {},
  socketDisabledState = false,
  ramTypeDisabledState = false,
}) => {
  const [options, setOptions] = useState<socketRamType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/socket-ramtype`,
        );
        const data = await response.json();
        setOptions(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row gap-2">
      <div>
        <label
          htmlFor="compatibility section"
          className="mb-3 block text-sm font-medium text-black dark:text-white"
        >
          Socket
        </label>
        <MultiSelect
          disabled={socketDisabledState}
          className="bg-slate-50 dark:bg-gray-800"
          options={
            options
              ? options.socket.map((socket: any) => ({
                  value: socket.id,
                  label: socket.socket_name,
                }))
              : []
          }
          onValueChange={setSocketIds}
          defaultValue={socketIds}
          placeholder={"Pilih socket"}
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      </div>
      <div>
        <label
          htmlFor="compatibility section"
          className="mb-3 block text-sm font-medium text-black dark:text-white"
        >
          Tipe Ram
        </label>
        <MultiSelect
          disabled={ramTypeDisabledState}
          className="bg-slate-50 dark:bg-gray-800"
          options={
            options
              ? options.ram_type.map((rt: any) => ({
                  value: rt.id,
                  label: rt.ram_type_name,
                }))
              : []
          }
          onValueChange={setRamTypeIds}
          defaultValue={ramTypeIds}
          placeholder={"Pilih tipe ram"}
          variant="inverted"
          animation={2}
          maxCount={3}
        />
      </div>
    </div>
  );
};
