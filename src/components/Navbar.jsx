import Link from "next/link";
import React from "react";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <>
      <nav className="flex-between fixed z-50 w-full bg-blue-950 px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/icons/logo3.png"
            width={42}
            height={42}
            alt="JMEET_LOGO"
            className="max-sm:size-10 p-1"
          />
          <p className="text-[25px] font-extrabold">JMEET</p>
        </Link>
        <div className="flex justify-between items-center gap-5">
          <MobileNav />
          <SignedIn>
            <UserButton className="hover:bg-blue-700" />
          </SignedIn>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
