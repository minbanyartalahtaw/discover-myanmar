"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <SidebarProvider defaultOpen={open}>
        <AppSidebar />
        <main>
          <div className="shadow-md fixed top-0 w-screen bg-white z-2 flex justify-between items-center p-1">
            <div className="flex items-center">
              <SidebarTrigger className="p-5" />
              <p className="text-xl f p-2  border-gray-200">
                <a href={`/`}>Discover Myanmar</a>
              </p>
            </div>

            <Button
              variant={"ghost"}
              onClick={() => setOpen(!open)}
              className="mr-6">
              <Search />
            </Button>
          </div>

          <div className="w-[100vw]  h-auto z-0">
            {/* Command box */}
            <CommandDialog open={open} onOpenChange={setOpen}>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>Calendar</CommandItem>
                  <CommandItem>Search Emoji</CommandItem>
                  <CommandItem>Calculator</CommandItem>
                </CommandGroup>
              </CommandList>
            </CommandDialog>
            <div className="mt-20">
              {children}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
