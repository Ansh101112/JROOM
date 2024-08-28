import {
  CallControls,
  CallingState,
  CallStatsButton,
  DeviceSettings,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CallParticipantsList } from "@stream-io/video-react-sdk";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation"; // Import useRouter for navigation
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import { useToast } from "@/components/ui/use-toast"; // Import useToast

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  // Destructure the useCallCallingState hook from useCallStateHooks
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const { toast } = useToast(); // Use the toast function
  const router = useRouter(); // Initialize router for navigation

  if (callingState !== CallingState.JOINED) return <Loader />;

  const callLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const handleLeaveCall = () => {
    toast({
      title: "You have left the meeting.",
    });
    router.push("/"); // Navigate to the home page or desired route
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="flex w-full h-full max-w-[1000px] items-center">
          {callLayout()}
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
          <CallControls onLeave={handleLeaveCall} /> {/* Use the new handler */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center">
                <LayoutList className="cursor-pointer" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Layout Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLayout("grid")}>
                Grid Layout
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLayout("speaker-left")}>
                Speaker Layout (Left)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLayout("speaker-right")}>
                Speaker Layout (Right)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl px-4 py-4">
              <Users size={20} />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
