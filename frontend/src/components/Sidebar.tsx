"use client";

import React, { useState } from "react";
import Link from "next/link";

interface SidebarItem {
  name: string;
  url?: string;
  subItems?: SidebarItem[];
}

interface SidebarProps {
  sidebarData: SidebarItem[];
}

export default function Sidebar({ sidebarData }: SidebarProps) {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpand = (name: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <ul className="flex flex-col ml-auto gap-4 p-2 w-[60%] border-r-2 border-gray-100 pt-8">
      {sidebarData.map((item) => (
        <li key={item.name}>
          {item.subItems ? (
            <div className="">
              <button
                onClick={() => toggleExpand(item.name)}
                className="hover:text-blue-950 hover:font-semibold flex justify-between w-full items-center pr-2"
              >
                <p>{item.name}</p>
                <div
                  className={`ml-auto text-xl transform transition-transform duration-300 ${
                    expanded[item.name] ? "rotate-90" : ""
                  }`}
                >
                  ›
                </div>
              </button>
              <ul
                className={`pl-4 flex flex-col gap-2 overflow-hidden transition-[max-height_margin-y] duration-300 ease-in-out ${
                  expanded[item.name] ? "max-h-[500px] my-2" : "max-h-0"
                }`}
              >
                {item.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      className="hover:text-blue-950 hover:font-bold w-full py-2"
                      href={subItem.url!}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Link
              className="hover:text-blue-950 hover:font-bold"
              href={item.url!}
            >
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
