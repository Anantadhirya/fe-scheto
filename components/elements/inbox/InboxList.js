import InboxItem from "./InboxItem";

const InboxList = ({ notifications }) => {
  console.log("JALAN", notifications);
  return (
    <div className="flex flex-col space-y-4">
      {notifications.map((notification) => (
        <InboxItem
          key={notification._id}
          title={notification.title ?? "NO TITLE"}
          description={notification.message ?? "No description"}
          time={notification.time}
          isHighlighted={notification.isHighlighted}
          isNew={notification.isNew}
        />
      ))}
    </div>
  );
};

export default InboxList;
