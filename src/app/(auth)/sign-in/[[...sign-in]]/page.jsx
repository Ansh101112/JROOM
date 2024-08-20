import React from "react";
import { SignIn, UserButton } from "@clerk/nextjs";

const Signin = () => {
  return (
    <>
      <main className="flex h-screen w-full items-center justify-center">
        <SignIn></SignIn>
      </main>
    </>
  );
};

export default Signin;
