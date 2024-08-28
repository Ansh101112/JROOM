"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({ setisSetupComplete }) => {
  const [isMicCamToggledON, setisMicCamToggledON] = useState(false);

  const call = useCall();

  useEffect(() => {
    if (!call) {
      throw new Error("Error occurred");
    }

    const { camera, microphone } = call;

    if (camera && microphone) {
      if (isMicCamToggledON) {
        camera.disable();
        microphone.disable();
      } else {
        camera.enable();
        microphone.enable();
      }
    }
  }, [isMicCamToggledON, call]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <h1 className="text-2xl">Setup your meet</h1>
      <VideoPreview />
      <div className="flex h-16 justify-center gap-2 items-center font-medium">
        <input
          type="checkbox"
          checked={isMicCamToggledON}
          onChange={(e) => setisMicCamToggledON(e.target.checked)}
        />
        Join with mic and camera OFF
      </div>
      <Button
        className="rounded-md justify-center items-center bg-green-400 px-4 py-2.5"
        onClick={() => {
          call.join();
          setisSetupComplete(true); // Set the state to true to trigger redirect
        }}
      >
        Join Now
      </Button>
      <DeviceSettings />
    </div>
  );
};

export default MeetingSetup;
