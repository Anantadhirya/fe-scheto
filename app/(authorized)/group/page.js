"use client";
import { Button } from "@/components/elements/button";
import { Input } from "@/components/elements/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";

export const groups = [
  {
    name: "FIND IT",
    description:
      "Future Innovations and Discovery IT, a national level competition in the field of Information Technology organized by KMTETI FT UGM.",
    id: "1",
    owner: "Alexandra Adeline",
    members: [
      { name: "Alexandra Adeline" },
      { name: "Aaron Smith" },
      { name: "Marcelino S." },
      { name: "Abigail Christy" },
    ],
  },
  {
    name: "PAW Project",
    description:
      "Project to fulfill the final assignment mark for the DTETI FT UGM Web Application Development course",
    id: "2",
    owner: "Lorem",
    members: [
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
    ],
  },
  {
    name: "PIMNAS",
    description:
      "Scientific activity competition organized by the Directorate General of Learning and Student Affairs, Ministry of Education",
    id: "3",
    owner: "Lorem",
    members: [{ name: "Lorem ipsum" }, { name: "Lorem ipsum" }],
  },
  {
    name: "BEM KMFT",
    description:
      "UGM Faculty of Engineering Student Executive Board (BEM FT), an executive body and movement that coordinates all creative forces within KMFT UGM.",
    id: "4",
    owner: "Lorem",
    members: [
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
      { name: "Lorem ipsum" },
    ],
  },
  ...Array(7)
    .fill()
    .map((_) => ({
      name: "Lorem Ipsum",
      description: "Lorem Ipsum",
      id: "5",
      owner: "Lorem",
      members: [
        { name: "Lorem ipsum" },
        { name: "Lorem ipsum" },
        { name: "Lorem ipsum" },
      ],
    })),
];
console.log(groups);

export default function Group() {
  const [searchText, setSearchText] = useState("");
  const filteredGroups = groups.filter((group) =>
    searchText
      .split(" ")
      .every((word) => group.name.toLowerCase().includes(word.toLowerCase())),
  );
  return (
    <main className="flex h-screen w-full flex-col overflow-auto px-14 pt-14">
      {/* Top Row */}
      <div className="flex items-center justify-between gap-4 max-md:flex-col">
        {/* Search Bar */}
        <div className="relative flex min-w-[200px] grow items-center">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="w-full rounded-[30px] border-[2px] border-blue-200 px-4 py-2 pr-14 outline-0"
          />
          <div className="absolute right-[3%] text-[24px] text-blue-200">
            <BiSearchAlt />
          </div>
        </div>
        {/* Join and Create Buttons */}
        <div className="flex gap-2 max-md:flex-col">
          <Button className="min-w-[200px] max-md:w-full">Join Group</Button>
          <Button className="min-w-[200px] max-md:w-full">Create Group</Button>
        </div>
      </div>
      {/* Group List */}
      {filteredGroups.length === 0 ? (
        // Empty Group
        <div className="flex grow flex-col items-center justify-center gap-5 p-5">
          <div className="text-nowrap text-center text-blue-200/80">
            {searchText === ""
              ? "You have not joined any groups."
              : "You don't have any group discoverable."}
            <br />
            Try Join with a code or create one.
          </div>
          <div className="flex flex-col items-center gap-4 rounded-[20px] bg-gray-100 px-4 py-6 text-center outline outline-blue-200/70">
            <div className="text-[78px] text-blue-200">
              <BsPersonFill />
            </div>
            <div>Join a group with a code</div>
            <Input placeholder="Enter join code" className="h-fit !py-1" />
            <Button>Join Group</Button>
          </div>
        </div>
      ) : (
        // Non-Empty Group
        <div className="scroll-container mt-10 grid h-full grid-cols-3 content-start gap-10 overflow-auto pb-5 pr-5">
          {filteredGroups.map((group, idx) => (
            <Link
              key={group.id + idx}
              href={`/group/${group.id}`}
              className="flex h-[200px] flex-col items-center gap-2 rounded-[10px] bg-gray-100 p-5 text-blue-200"
            >
              <div className="text-2xl font-bold">{group.name}</div>
              <div className="overflow-hidden text-lg [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]">
                {group.description}
              </div>
              <div className="grow" />
              <div className="flex justify-center gap-[2px]">
                {group.members.map((member, idx) => (
                  <div
                    key={member.name + idx}
                    className="relative aspect-[1/1] w-8 overflow-hidden rounded-full"
                  >
                    <Image
                      src={member.image || "/default_profile.webp"}
                      alt=""
                      fill
                    />
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
