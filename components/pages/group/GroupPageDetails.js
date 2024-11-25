import { useEffect, useRef, useState } from "react";
import { GroupHeader } from "./components";
import { BsCheck2, BsPencilSquare } from "react-icons/bs";
import { Button } from "@/components/elements/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { LeaveGroup, UpdateDescription } from "@/components/query/detailGroup";
import { onError } from "@/components/query/errorHandler";
import toast from "react-hot-toast";

export function GroupPageDetails({ group, setPage }) {
  // Description Edit
  const [description, setDescription] = useState(group.description);
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const descriptionEditRef = useRef();
  useEffect(() => {
    if (edit) {
      descriptionEditRef.current.focus();
    }
  }, [edit]);
  const maxDescLength = 250;
  const displayDescLength = description?.length >= maxDescLength - 50;

  // Member List
  const displayedMembers = 6;
  const [showFullMembers, setShowFullMembers] = useState(false);

  // mutate create group
  const LeaveGroupQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Leaving group");
      return LeaveGroup(props);
    },
    retry: 1,
    onError: (error) => {
      toast.dismiss();
      onError(error);
    },
    onSuccess: (data) => {
      toast.dismiss();
      //console.log(data)
      toast.success(data?.message);
      router.replace("/group");
    },
  });

  // mutate description
  const UpdateDescriptionQuery = useMutation({
    mutationFn: (props) => {
      toast.loading("Updating description");
      return UpdateDescription(props);
    },
    retry: 1,
    onError: (error) => {
      toast.dismiss();
      setDescription(group?.description);
      setEdit(false);
      onError(error);
    },
    onSuccess: (data) => {
      toast.dismiss();
      //console.log(data)
      setEdit(false);
      group.description = description;
      toast.success(data?.message);
    },
  });

  async function SaveNewDescription() {
    if (edit) {
      UpdateDescriptionQuery.mutate({
        _id: group._id,
        description: description,
      });
    } else {
      setEdit(true);
    }
  }
  return (
    <div className="flex grow flex-col">
      {/* Group Name and Invite Code */}
      <GroupHeader group={group} setPage={setPage} />
      {/* Description */}
      <div className="flex items-start justify-between gap-2 border-b-[1px] border-b-blue-200 py-10 pl-14 pr-8 text-xl text-blue-200">
        <div className="flex w-0 grow flex-col break-words">
          {edit ? (
            <textarea
              className="w-full resize-none break-words border-blue-200 outline-0 [field-sizing:content] focus:border-b-[1px]"
              ref={descriptionEditRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={maxDescLength}
            />
          ) : (
            <p className="w-full break-words">{description}</p>
          )}
          {displayDescLength && (
            <div className="self-end text-sm">
              {description?.length}/{maxDescLength}
            </div>
          )}
        </div>
        <button
          className="mt-[2px] text-2xl"
          onClick={() => SaveNewDescription()}
        >
          {edit ? <BsCheck2 /> : <BsPencilSquare />}
        </button>
      </div>
      {/* Members */}
      <div className="flex flex-col items-start justify-between gap-9 py-9 pl-14 pr-8 text-blue-200">
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="text-nowrap text-2xl font-semibold text-blue-300">
            Group Member
          </div>
        </div>
        <div className="grid w-full gap-x-1 gap-y-12 max-xs:grid-cols-1 xs:grid-cols-2">
          {group.members
            .slice(0, showFullMembers ? undefined : displayedMembers)
            .map((member, idx) => (
              <div key={member.name + idx} className="flex items-center gap-5">
                <div className="relative aspect-square w-[60px] flex-none overflow-hidden rounded-[20px]">
                  <Image
                    src={member.image || "/default_profile.webp"}
                    alt=""
                    fill
                  />
                </div>
                <div className="flex w-full min-w-0 flex-col text-base">
                  <div className="truncate text-nowrap font-medium text-blue-200">
                    {member.name}
                  </div>
                  <div className="text-black/60">{member.role || "Member"}</div>
                </div>
              </div>
            ))}
        </div>
        {group.members.length > displayedMembers && (
          <div className="flex w-full justify-center">
            <button
              className="text-nowrap p-0 text-lg outline-0"
              onClick={() => setShowFullMembers(!showFullMembers)}
            >
              {showFullMembers
                ? "Show less members"
                : `Show all members (${group.members.length - displayedMembers} more)`}
            </button>
          </div>
        )}
      </div>
      {/* Leave Group Button */}
      <div className="grow" />
      <div className="py-2 pb-5 pl-14 pr-8">
        <Button
          type="button"
          variant="destructive"
          onClick={(e) => LeaveGroupQuery.mutate({ _id: group._id })}
        >
          Leave Group
        </Button>
      </div>
    </div>
  );
}
