"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsCheck2, BsFiles, BsInfoCircle, } from "react-icons/bs";
import { IoReloadCircle } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RegenerateCode } from "@/components/query/detailGroup";
import { onError } from "@/components/query/errorHandler";

export function GroupHeader({ group, setPage, showIcon = false }) {
  const [isCopying, setIsCopying] = useState(false);
  const copyAnimationDuration = 1500;
  const [inviteCode, SetInviteCode] = useState(group.invite_code)

  // mutate regenerate code
  const RegenerateCodeQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Creating new code")
      return RegenerateCode(props)
    },
    retry: 1,
    onError: (error) => {
      toast.dismiss()
      onError(error)
    },
    onSuccess: (data) => {
      toast.dismiss()
      //console.log(data)
      SetInviteCode(data.newInvite)
      group.invite_code = data.newInvite
      toast.success(data?.message)
    },
  })

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
        <div className="truncate text-nowrap">{group?.name}</div>
        {showIcon && (
          <div className="text-lg">
            <BsInfoCircle />
          </div>
        )}
      </button>
      {/* Invite Code */}
      <div className="flex flex-row gap-0">
        <button
          className="flex items-center gap-2 p-2 outline-0"
          onClick={() => {
            if (isCopying) return;
            setIsCopying(true);
            navigator.clipboard.writeText(inviteCode);
            toast.success("Group code copied!");
            setTimeout(() => setIsCopying(false), copyAnimationDuration);
          }}
        >
          <span>{inviteCode}</span>
          <span className="text-xl">
            {!isCopying ? <BsFiles /> : <BsCheck2 />}
          </span>

        </button>
        <button className="flex items-center gap-2 p-2 outline-0"
          onClick={(e) => RegenerateCodeQuery.mutate({ _id: group._id })}
        >
          <span className="text-xl" >
            {<IoReloadCircle />}
          </span>
        </button>
      </div>

    </div>
  );
}
