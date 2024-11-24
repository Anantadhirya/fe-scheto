import InboxList from "@/components/elements/inbox/InboxList"; // Import InboxList

export default function Inbox() {
  const notifications = [
    {
      id: 1,
      title: "Event Reminder",
      description:
        "Don't forget! You have an upcoming meeting with Project Group B tomorrow at 14:00.",
      time: "5 hours ago",
      isHighlighted: false,
      isNew: true,
    },
    {
      id: 2,
      title: "Schedule Change",
      description:
        "Important Update: The meeting with the Marketing Team has been rescheduled to Friday at 10:30. Please update your calendar.",
      time: "7 hours ago",
      isHighlighted: false,
      isNew: true,
    },
    {
      id: 3,
      title: "Group Announcement",
      description:
        "Group FindIT! has added you to the team for the upcoming strategy session. The session will be held on Thursday, 13:00-15:00.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      id: 4,
      title: "Group Announcement",
      description:
        "Group KKN Bangka Belitung has added you to the team for the upcoming strategy session. The session will be held on Thursday, 13:00-15:00.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      id: 5,
      title: "Schedule Change",
      description:
        "Important Update: The meeting with the Hackathon Team has been rescheduled to Saturday at 10:30. Please update your calendar.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },

    {
      id: 6,
      title: "Group Announcement",
      description:
        "Group KKN Bangka Belitung has added you to the team for the upcoming strategy session. The session will be held on Thursday, 13:00-15:00.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      id: 7,
      title: "Schedule Change",
      description:
        "Important Update: The meeting with the Hackathon Team has been rescheduled to Saturday at 10:30. Please update your calendar.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      id: 8,
      title: "Group Announcement",
      description:
        "Group KKN Bangka Belitung has added you to the team for the upcoming strategy session. The session will be held on Thursday, 13:00-15:00.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
    {
      id: 9,
      title: "Schedule Change",
      description:
        "Important Update: The meeting with the Hackathon Team has been rescheduled to Saturday at 10:30. Please update your calendar.",
      time: "1 day ago",
      isHighlighted: false,
      isNew: false,
    },
  ];

  return (
    <main className="flex flex-col h-screen w-full bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-primary flex-shrink-0 mr-4 pl-4">Inbox</h1>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto p-4">
        <InboxList notifications={notifications} />
      </div>
    </main>
  );
}
