import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading"
        width={50}
        height={50}
      ></Image>
    </div>
  );
};

export default Loader;
