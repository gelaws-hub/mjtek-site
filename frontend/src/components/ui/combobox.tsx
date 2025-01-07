"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({
  defaultOption = {},
  options = [],
  setOption = () => {},
  label = "",
}: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(defaultOption.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="bg-inherit" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-[229px] justify-between dark:border-gray-500 md:min-w-[200px]"
        >
          {value
            ? options.find((data: any) => data.value === value)?.label
            : "Pilih " + label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[10000] w-[170px] md:w-[229px] max-w-full p-0 ">
        <Command className="bg-slate-50 dark:bg-gray-800">
          <CommandInput placeholder="Search data..." className="h-9" />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {options.map((option: any) => {
                return (
                  <CommandItem
                    keywords={[option.label, option.value]}
                    className="cursor-pointer hover:text-gray-900 dark:text-slate-100"
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue: any) => {
                      setValue(currentValue === value ? null : currentValue);
                      setOption(option);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
