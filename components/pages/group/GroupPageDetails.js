import { useEffect, useRef, useState } from "react";
import { GroupHeader } from "./components";
import { BsCheck2, BsPencilSquare } from "react-icons/bs";
import { Button } from "@/components/elements/button";
import Image from "next/image";

export function GroupPageDetails({ group, setPage }) {
  // Description Edit
  const [description, setDescription] = useState(group.description);
  const [edit, setEdit] = useState(false);
  const descriptionEditRef = useRef();
  useEffect(() => {
    if (edit) {
      descriptionEditRef.current.focus();
    }
  }, [edit]);
  const maxDescLength = 250;
  const displayDescLength = description.length >= maxDescLength - 50;

  // Member List
  const displayedMembers = 6;
  const [showFullMembers, setShowFullMembers] = useState(false);
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
              {description.length}/{maxDescLength}
            </div>
          )}
        </div>
        <button className="mt-[2px] text-2xl" onClick={() => setEdit(!edit)}>
          {edit ? <BsCheck2 /> : <BsPencilSquare />}
        </button>
      </div>
      {/* Members */}
      <div className="flex flex-col items-start justify-between gap-9 py-9 pl-14 pr-8 text-blue-200">
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="text-nowrap text-2xl font-semibold text-blue-300">
            Group Member
          </div>
          <Button className="justify-self-end px-9 py-2 text-base">
            Add Member
          </Button>
        </div>
        <div className="xs:grid-cols-2 max-xs:grid-cols-1 grid w-full gap-x-1 gap-y-12">
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
        <Button variant="destructive">Leave Group</Button>
      </div>
    </div>
  );
}
