"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  LayoutDashboard,
  Package,
  Settings,
  Users,
  PieChart,
  ShoppingCart,
  FileText,
  Mail,
} from "lucide-react";
import { useState } from "react";

type SidebarNavItem = {
  title: string;
  href: string;
  icon: any;
  submenu?: SidebarNavItem[];
};

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Produk",
    href: "/admin/product",
    icon: Package,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-blue-950 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0">
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white">MJ </h1>
        </Link>
      </div>

      <ScrollArea className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {sidebarNavItems.map((item) =>
                item.submenu ? (
                  <li key={item.title}>
                    <Collapsible
                      open={openMenus.includes(item.title)}
                      onOpenChange={() => toggleMenu(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-white hover:bg-blue-950"
                        >
                          <span className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.title}
                          </span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1">
                        {item.submenu.map((subItem) => (
                          <Button
                            key={subItem.href}
                            variant={
                              pathname === subItem.href ? "secondary" : "ghost"
                            }
                            className="w-full justify-start pl-10 text-white hover:bg-blue-950"
                            asChild
                          >
                            <Link href={subItem.href}>{subItem.title}</Link>
                          </Button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start text-white hover:bg-blue-950"
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  </li>
                )
              )}
            </ul>
          </div>
        </nav>
      </ScrollArea>
    </aside>
  );
}
