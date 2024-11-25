"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import InboxList from "@/components/elements/inbox/InboxList"; // Import InboxList

import { onError } from "@/components/query/errorHandler";
import { GetUserInbox } from "@/components/query/inboxUser";

export default function Inbox() {
  const notifications = [
    {
      _id: 1,
      title: "Event Reminder",
      message:
        "Don't forget! You have an upcoming meeting with Project Group B tomorrow at 14:00.",
      time: "5 hours ago",
      isHighlighted: false,
      isNew: true,
    },
    {
      _id: 2,
      title: "Schedule Change",
      message:
        "Important Update: The meeting with the Marketing Team has been rescheduled to Friday at 10:30. Please update your calendar.",
      time: "7 hours ago",
      isHighlighted: false,
      isNew: true,
    },
    {
      _id: 3,
      title: "Group Announcement",
      message:
        "Group FindIT! has added you to the team for the upcoming strategy session. The session will be held on Thursday, 13:00-15:00.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      _id: 4,
      title: "Group Announcement",
      message:
        "Group KKN Bangka Belitung has added you to the team for the upcoming strategy session. The session will be held on Thursday, 13:00-15:00.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      _id: 5,
      title: "Schedule Change",
      message:
        "Important Update: The meeting with the Hackathon Team has been rescheduled to Saturday at 10:30. Please update your calendar.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },

    {
      _id: 6,
      title: "Group Announcement",
      message:
        "Group KKN Bangka Belitung has added you to the team for the upcoming strategy session. The session will be held on Thursday, 13:00-15:00.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      _id: 7,
      title: "Schedule Change",
      message:
        "Important Update: The meeting with the Hackathon Team has been rescheduled to Saturday at 10:30. Please update your calendar.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      _id: 8,
      title: "Group Announcement",
      message:
        "Group KKN Bangka Belitung has added you to the team for the upcoming strategy session. The session will be held on Thursday, 13:00-15:00.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      _id: 9,
      title: "Schedule Change",
      message:
        "Important Update: The meeting with the Hackathon Team has been rescheduled to Saturday at 10:30. Please update your calendar.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
  ];

  const GetAllInboxQuery = useQuery({
    queryKey: ["once"],
    queryFn: (props) => {
      return GetUserInbox();
    },
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const GetInbox = () => {
    if (GetAllInboxQuery.isLoading) {
      return [];
    } else if (GetAllInboxQuery.isError) {
      return [];
    } else {
      return [...GetAllInboxQuery.data?.inbox];
    }
  };

  return (
    <main className="flex h-screen w-full flex-col bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <h1 className="mr-4 flex-shrink-0 pl-4 text-2xl font-bold text-primary">
          Inbox
        </h1>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto p-4">
        <InboxList notifications={GetInbox()} />
      </div>
    </main>
  );
}
