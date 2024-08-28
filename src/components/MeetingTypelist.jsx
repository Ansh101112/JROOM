"use client";

import Image from "next/image";
import React, { useState } from "react";
import MeetModal from "./MeetModal";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "@/components/ui/use-toast";
import { ClipLoader } from "react-spinners";
import { Input } from "./ui/input";
import isValidUrl from "@/lib/isValidUrl";

const MeetingTypelist = () => {
  const [meetingState, setMeetingState] = useState("");
  const router = useRouter();
  const user = useUser();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState();
  const [loading, setLoading] = useState(false);
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      setLoading(true); // Start loading
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to start the call.");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({ title: "Meeting Created Successfully." });
    } catch (error) {
      toast({
        title: "Failed to create a meeting. Try again later.",
        description: "There was an error while creating the meeting.",
      });
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleJoinMeeting = () => {
    if (!isValidUrl(values.link)) {
      toast({
        title: "Invalid Link",
        description: "Please provide a valid meeting link.",
        variant: "error",
      });
      return;
    }
    router.push(values.link);
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div
          className="bg-orange-300 px-4 py-6 justify-between flex flex-col min-h-[260px] w-full xl:max-[270px] rounded-[14px] cursor-pointer"
          onClick={() => setMeetingState("isInstantMeeting")}
        >
          <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image
              src="/icons/add-meeting.svg"
              alt="meeting"
              width={27}
              height={27}
            />
          </div>
          <div>
            <h1>New Meeting</h1>
            <p>Start an instant meeting</p>
          </div>
        </div>
        <div
          className="bg-blue-300 px-4 py-6 justify-between flex flex-col min-h-[260px] w-full xl:max-[270px] rounded-[14px] cursor-pointer"
          onClick={() => setMeetingState("join-meeting")}
        >
          <div className="flex-center glassmorphism size-12 rounded-[10px]">
            <Image
              src="/icons/join-meeting.svg"
              alt="meeting"
              width={27}
              height={27}
            />
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
            />
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
            />
          </div>
          <div>
            <h1>View Recordings</h1>
            <p>Meeting Recordings</p>
          </div>
        </div>
      </section>

      {loading && (
        <div className="flex justify-center items-center h-full">
          <ClipLoader size={20} color={"#123abc"} loading={loading} />
        </div>
      )}

      <MeetModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState("")}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText={loading ? <ClipLoader /> : "Start Meeting"}
        handleClick={createMeeting}
      />

      <MeetModal
        isOpen={meetingState === "join-meeting"}
        onClose={() => setMeetingState("")}
        title="Join Meeting by Link"
        className="text-center"
        buttonText={loading ? <ClipLoader /> : "Join Meeting"}
        handleClick={handleJoinMeeting}
      >
        <Input
          placeholder="Meeting Link"
          value={values.link}
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetModal>
    </>
  );
};

export default MeetingTypelist;
