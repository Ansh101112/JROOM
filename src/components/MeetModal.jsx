import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const MeetModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  buttonIcon,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 px-6 py-9 bg-black">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold leading-[42px]">{title}</h1>
          {children && <div className="flex flex-col gap-4">{children}</div>}
          <button
            className="bg-blue-800 w-full py-2 rounded-lg flex items-center justify-center"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image src={buttonIcon} alt="btnicon" width={13} height={13} />
            )}
            {buttonText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetModal;
