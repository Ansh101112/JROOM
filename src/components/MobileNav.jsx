"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sideBarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathName = usePathname();

  return (
    <>
      <section className="w-full max-w-[264px]">
        <Sheet>
          <SheetTrigger>
            <Image
              src="/icons/hamburger.svg"
              width={36}
              height={36}
              alt="icon-hamburger"
              className="cursor-pointer sm:hidden"
            ></Image>
          </SheetTrigger>
          <SheetContent side="left" className="border-none bg-blue-900">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/icons/logo.svg"
                width={32}
                height={32}
                alt="JMEET_LOGO"
                className="max-sm:size-10"
              ></Image>
              <p className="text-[25px] font-extrabold">JMEET</p>
            </Link>
            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
              <SheetClose asChild>
                <section className="flex h-full flex-col gap-6 pt-16">
                  {sideBarLinks.map((link) => {
                    const isActive =
                      pathName === link.route ||
                      pathName.startsWith(`${link.route}/`);
                    return (
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          "flex items-center p-4 rounded-lg justify-start",
                          {
                            "bg-blue-500": isActive,
                          }
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </section>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </>
  );
};

export default MobileNav;
