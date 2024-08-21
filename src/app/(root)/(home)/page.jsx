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
            <h2 className="glassmorphism2 max-w-[273px] rounded py-2 text-center text-base font-normal">
              Upcoming Meeting at: 12:30 PM
            </h2>
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
