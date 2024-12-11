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

export function Combobox({ defaultOption = {}, options = [], setOption = () => {} }: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  console.log("default value : ", defaultOption);
  console.log("value : ", value);
  console.log("options : ", options);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="bg-inherit" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((data: any) => data.value === value)?.label
            : defaultOption.label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[10000] w-[200px] p-0 ">
        <Command className="bg-slate-50 dark:bg-gray-800 ">
          <CommandInput placeholder="Search data..." className="h-9" />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {options.map((option: any) => {
                return (
                  <CommandItem
                    className="cursor-pointer hover:text-gray-900 dark:hover:text-slate-100"
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
