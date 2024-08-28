import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  // Correctly reference the hook
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) {
    return null;
  }

  return (
    <>
      <Button
        onClick={async () => {
          await call.endCall();
          router.push("/");
          toast({
            title: "Call ended successfully.",
          });
        }}
        className="bg-red-500"
      >
        End Call for everyone
      </Button>
    </>
  );
};

export default EndCallButton;
