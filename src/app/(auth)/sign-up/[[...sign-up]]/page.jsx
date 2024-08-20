import React from "react";
import { SignUp } from "@clerk/nextjs";

const Signup = () => {
  return (
    <>
      <main className="flex h-screen w-full items-center justify-center">
        <SignUp></SignUp>
      </main>
    </>
  );
};

export default Signup;
