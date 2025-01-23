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

import { TransactionStatus } from "./types";

export function StatusComboBox({
  statuses,
  currentStatus,
  onChangeStatus,
}: {
  statuses: TransactionStatus[];
  currentStatus: TransactionStatus;
  onChangeStatus: (statusId: number, statusName: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between text-xs md:text-sm", {
            "bg-red-200 text-red-600 dark:bg-red-900 dark:text-red-300":
              currentStatus.id === 0,
          })}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="w-[150px] text-left truncate">{currentStatus.name}</p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] bg-white p-0 dark:bg-boxdark-2 dark:text-white">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup onClick={(e) => e.stopPropagation()}>
              {statuses.map((status: TransactionStatus) => {
                return (
                  <CommandItem
                    keywords={[status.name]}
                    value={status.id.toString()}
                    key={status.id.toString()}
                    onSelect={() => {
                      onChangeStatus(status.id, status.name);
                      setOpen(false);
                    }}
                    className={`${currentStatus.id === status.id ? "" : "text-gray-600"} cursor-pointer hover:text-gray-900 dark:hover:text-white text-xs md:text-sm`}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentStatus.id === status.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {status.name}
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
