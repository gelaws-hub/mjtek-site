"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Pencil } from "lucide-react";

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
  onAddNew = null,
  onEdit = null,
}: any) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    setValue(defaultOption.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showAddButton = searchValue && 
    !options.some((opt: any) => 
      opt.label.toLowerCase() === searchValue.toLowerCase()
    ) && 
    onAddNew;

  const handleEdit = (e: React.MouseEvent, option: any) => {
    e.stopPropagation();
    const newName = window.prompt(`Enter new name for "${option.label}":`, option.label);
    if (newName && newName.trim() !== "" && newName !== option.label) {
      onEdit({ ...option, label: newName.trim() });
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="bg-inherit" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-full justify-between dark:border-gray-500 md:min-w-[200px]"
        >
          {value
            ? options.find((data: any) => data.value === value)?.label
            : "Pilih " + label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-[10000] w-[170px] md:w-[229px] max-w-full p-0 ">
        <Command className="bg-slate-50 dark:bg-gray-800">
          <CommandInput 
            placeholder="Search data..." 
            className="h-9" 
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              {showAddButton ? (
                <Button
                  variant="outline"
                  className="w-full justify-start px-2 py-1.5 text-sm"
                  onClick={() => {
                    onAddNew(searchValue);
                    setOpen(false);
                  }}
                >
                  Add "{searchValue}"
                </Button>
              ) : (
                "No data found."
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option: any) => {
                return (
                  <CommandItem
                    keywords={[option.label, option.value]}
                    className="cursor-pointer dark:text-slate-200 hover:text-gray-900 dark:hover:text-white group"
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue: any) => {
                      setValue(currentValue === value ? null : currentValue);
                      setOption(option);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === option.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {option.label}
                      </div>
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100"
                          onClick={(e) => handleEdit(e, option)}
                        >
                          <Pencil className="h-3 w-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
                        </Button>
                      )}
                    </div>
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