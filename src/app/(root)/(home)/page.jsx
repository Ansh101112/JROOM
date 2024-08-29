import MeetingTypelist from "@/components/MeetingTypelist";
import React from "react";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(
    now
  );
  return (
    <>
      <section className="flex size-full flex-col gap-5 text-white">
        <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
          <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
            <h1 class="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl">
              <span class="text-transparent bg-clip-text bg-gradient-to-r gap-2 to-emerald-600 from-sky-400">
                JMEET
              </span>
              <span className="px-2">Better way to meet.</span>
            </h1>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Still in development.
            </p>

            <div className="flex flex-col py-1 gap-25">
              <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
              <p className="text-lg font-medium text-sky-1 lg:text-2xl">
                {date}
              </p>
            </div>
          </div>
        </div>
        <MeetingTypelist></MeetingTypelist>
      </section>
    </>
  );
};

export default Home;
