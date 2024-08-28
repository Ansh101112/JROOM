"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useCallByGetId } from "@/hooks/useCallByGetId";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ id }) => {
  const [isSetupComplete, setisSetupComplete] = useState(false);
  const { call } = useCallByGetId(id);

  if (!call) return <Loader></Loader>;

  return (
    <>
      <main className="h-screen w-full">
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupComplete ? (
              <MeetingSetup setisSetupComplete={setisSetupComplete} />
            ) : (
              <MeetingRoom />
            )}
          </StreamTheme>
        </StreamCall>
      </main>
    </>
  );
};

export default Meeting;
