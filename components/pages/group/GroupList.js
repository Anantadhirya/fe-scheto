import Image from "next/image";
import Link from "next/link";

export function GroupList({ groups }) {
  return (
    <div className="grid grid-cols-1 content-start gap-x-11 gap-y-12 px-14 pb-10 md:grid-cols-2 lg:grid-cols-3">
      {groups.map((group, idx) => (
        <Link
          key={group.id + idx}
          href={`/group/${group.id}`}
          className="flex h-[200px] flex-col items-center gap-2 overflow-hidden rounded-[10px] bg-blue-100 p-5 text-blue-200 shadow-md"
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
  );
}
