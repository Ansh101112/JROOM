"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCallByGetId } from "@/hooks/useCallByGetId";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

const PersonalRoom = () => {
  const Table = ({ title, description }) => {
    return (
      <div className="flex flex-col items-start gap-2 xl:flex-row">
        <h1 className="text-base font-medium lg:text-xl xl:min-w-32">
          {title}:
        </h1>
        <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
          {description}
        </h1>
      </div>
    );
  };

  const router = useRouter();
  const { user } = useUser();
  const meetingID = user.id;
  const { toast } = useToast();
  const client = useStreamVideoClient();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingID}?personal=true`;

  const { call } = useCallByGetId(meetingID);

  const startRoom = async () => {
    if (!client || !user) {
      return toast({
        title: "Error Occurred. Try again after sometime.",
      });
    }

    const description = `${user.username}'s meeting room`; // Define the description here

    const newCall = client.call("default", meetingID);
    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description,
          },
        },
      });
    }
    router.push(`/meeting/${meetingID}?personal=true`);
  };

  return (
    <>
      <section className="flex size-full flex-col gap-10">
        <h1 className="text-3xl font-bold">Personal Room</h1>
        <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
          <Table
            title="Topic"
            description={`${user.username}'s meeting room`}
          />
          <Table title="Meeting ID" description={meetingID} />
          <Table title="Invite Link" description={meetingLink} />
        </div>
        <div className="flex gap-5">
          <Button className="bg-blue-500" onClick={startRoom}>
            Start Meeting
          </Button>
          <Button
            className="px-6"
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({
                title: "Link Copied",
              });
            }}
          >
            Copy invitation Link
          </Button>
        </div>
      </section>
    </>
  );
};

export default PersonalRoom;
