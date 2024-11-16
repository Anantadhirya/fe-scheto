"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsCheck2, BsFiles, BsInfoCircle } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export function GroupHeader({ group, setPage, showIcon = false }) {
  const [isCopying, setIsCopying] = useState(false);
  const copyAnimationDuration = 1500;
  return (
    <div
      className={twMerge(
        "relative z-20 flex items-center justify-between bg-blue-100 py-2 pl-12 pr-8 text-2xl font-extrabold text-blue-200 shadow-md",
        !showIcon && "flex-wrap",
      )}
    >
      {/* Group Name */}
      <button
        className="flex min-w-0 items-center gap-2 p-2 outline-0"
        onClick={() => setPage("details")}
      >
        <div className="truncate text-nowrap">{group.name}</div>
        {showIcon && (
          <div className="text-lg">
            <BsInfoCircle />
          </div>
        )}
      </button>
      {/* Invite Code */}
      <button
        className="flex items-center gap-2 p-2 outline-0"
        onClick={() => {
          if (isCopying) return;
          setIsCopying(true);
          navigator.clipboard.writeText(group.id);
          toast.success("Group code copied!");
          setTimeout(() => setIsCopying(false), copyAnimationDuration);
        }}
      >
        <span>#{group.id}</span>
        <span className="text-xl">
          {!isCopying ? <BsFiles /> : <BsCheck2 />}
        </span>
      </button>
    </div>
  );
}
