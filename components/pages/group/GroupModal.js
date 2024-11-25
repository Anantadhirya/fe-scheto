"use client";
import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import { useState } from "react";
import { BsPeopleFill, BsPersonFill, BsX } from "react-icons/bs";

function Modal({
  icon,
  title,
  placeholder,
  button_text,
  open,
  setOpen,
  handleSubmit,
}) {
  const [localOpen, setLocalOpen] = useState();
  const [input, setInput] = useState("");
  const handleClose = () => {
    setLocalOpen(false);
    setInput("");
    if (setOpen) setOpen(false);
  };
  return (
    (open ?? localOpen) && (
      <>
        <div className="fixed inset-0 z-[110]">
          <div
            className="absolute inset-0 bg-gray-50/60"
            onClick={handleClose}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-auto">
            <div className="pointer-events-auto relative flex flex-col items-center gap-7 rounded-[20px] bg-blue-100 px-5 py-10 text-center outline outline-1 outline-blue-200/70">
              <button
                className="absolute right-2 top-2 p-1 text-2xl text-blue-200 outline-0"
                onClick={handleClose}
              >
                <BsX />
              </button>
              <div className="text-[78px] text-blue-200">{icon}</div>
              <div className="text-base font-semibold text-blue-200">
                {title}
              </div>
              <Input
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                size="sm"
                className="w-[293px] max-w-[80vw]"
              />
              <Button className="w-[186px]" onClick={() => handleSubmit(input)}>
                {button_text}
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export function JoinGroupModal({ onJoin, open, setOpen }) {
  return (
    <Modal
      handleSubmit={onJoin}
      icon={<BsPersonFill />}
      title="Join a group with a code"
      placeholder="Enter join code"
      button_text="Join Group"
      open={open}
      setOpen={setOpen}
    />
  );
}

export function CreateGroupModal({ onCreate, open, setOpen }) {
  return (
    <Modal
      handleSubmit={onCreate}
      icon={<BsPeopleFill />}
      title="Create a group"
      placeholder="Group name"
      button_text="Create Group"
      open={open}
      setOpen={setOpen}
    />
  );
}
