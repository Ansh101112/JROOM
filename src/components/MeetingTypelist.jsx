"use client";

import Image from "next/image";
import React from "react";
import MeetModal from "./MeetModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MeetingTypelist = () => {
  const [meetingState, setMeetingState] = useState(
    "isScheduleMeeting",
    "isJoiningMeeting",
    "isInstantMeeting"
  );
  const createMeeting = async () => {};
  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="bg-orange-300 px-4 py-6 justify-between flex flex-col min-h-[260px] w-full xl:max-[270px] rounded-[14px] cursor-pointer">
          <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image
              src="/icons/add-meeting.svg"
              alt="meeting"
              width={27}
              height={27}
            ></Image>
          </div>
          <div>
            <h1>New Meeting</h1>
            <p>Start an instant meeting</p>
          </div>
        </div>
        <div className="bg-blue-300 px-4 py-6 justify-between flex flex-col min-h-[260px] w-full xl:max-[270px] rounded-[14px] cursor-pointer">
          <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image
              src="/icons/join-meeting.svg"
              alt="meeting"
              width={27}
              height={27}
            ></Image>
          </div>
          <div>
            <h1>Join Meeting</h1>
            <p>Via invitation link</p>
          </div>
        </div>
        <div className="bg-red-300 px-4 py-6 justify-between flex flex-col min-h-[260px] w-full xl:max-[270px] rounded-[14px] cursor-pointer">
          <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image
              src="/icons/schedule.svg"
              alt="meeting"
              width={27}
              height={27}
            ></Image>
          </div>
          <div>
            <h1>Schedule Meeting</h1>
            <p>Plan your meeting</p>
          </div>
        </div>
        <div className="bg-blue-800 px-4 py-6 justify-between flex flex-col min-h-[260px] w-full xl:max-[270px] rounded-[14px] cursor-pointer">
          <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image
              src="/icons/recordings.svg"
              alt="meeting"
              width={27}
              height={27}
            ></Image>
          </div>
          <div>
            <h1>View Recordings</h1>
            <p>Meeting Recordings</p>
          </div>
        </div>
      </section>
      <MeetModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </>
  );
};

export default MeetingTypelist;
