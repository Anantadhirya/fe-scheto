"use client";
import { Button } from "@/components/elements/button";
import { GroupEmpty, GroupList } from "@/components/pages/group";
import { groups } from "@/components/pages/group/dummy_group";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsX } from "react-icons/bs";

export default function Group() {
  const [searchText, setSearchText] = useState("");
  const filteredGroups = groups.filter((group) =>
    searchText
      .split(" ")
      .every((word) => group.name.toLowerCase().includes(word.toLowerCase())),
  );
  return (
    <main className="scroll-container flex h-screen w-full flex-col overflow-auto">
      {/* Top Row */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-gradient-to-b from-white from-80% to-white/0 px-14 pb-10 pt-14 max-md:flex-col">
        {/* Search Bar */}
        <div className="relative flex min-w-[200px] grow items-center max-md:w-full">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="w-full rounded-[30px] border-[2px] border-blue-200 px-14 py-2 outline-0"
          />
          <div className="absolute left-5 text-[24px] text-blue-200">
            <BiSearchAlt />
          </div>
          {searchText && (
            <button
              className="clear-button absolute right-5 text-[24px] text-blue-200"
              onClick={() => setSearchText("")}
            >
              <BsX />
            </button>
          )}
        </div>
        {/* Join and Create Buttons */}
        <div className="flex gap-2 max-md:w-full max-md:flex-col">
          <Button className="min-w-[120px] px-4 max-md:w-full">
            Join Group
          </Button>
          <Button className="min-w-[120px] px-4 max-md:w-full">
            Create Group
          </Button>
        </div>
      </div>
      {/* Group List */}
      {filteredGroups.length === 0 ? (
        <GroupEmpty type={groups.length === 0 ? "not-joined" : "not-found"} />
      ) : (
        <GroupList groups={filteredGroups} />
      )}
    </main>
  );
}
