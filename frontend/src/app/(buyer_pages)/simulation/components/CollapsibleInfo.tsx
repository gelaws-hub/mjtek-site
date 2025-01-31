"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Props {
  title: string;
  description: string;
  user: string;
}

export function CollapsibleInfo({ title, description, user }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <CollapsibleTrigger asChild>
        <div
          className="flex w-full cursor-pointer items-center justify-between rounded-md border px-2"
          role="button"
        >
          <h4 className="truncate text-sm font-semibold">{title}</h4>
          <Button variant="ghost" size="sm" className="">
            <ChevronRight className={`"h-4 w-4 transition-all ease-in-out duration-300 ${isOpen ? "rotate-90" : ""}`} />
            <span className="sr-only">Toggle</span>
          </Button>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 border mt-0 rounded-b-md p-2" style={{marginTop: 0}}>
        <div className="px-4 text-sm">
          <span>Judul : </span> {title}
        </div>
        <div className="px-4 text-sm">
          <span>Author : </span> {user}
        </div>
        <div className="px-4 text-sm">{description}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
