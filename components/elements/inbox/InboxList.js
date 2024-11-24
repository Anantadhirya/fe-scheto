import InboxItem from "./InboxItem";

const InboxList = ({ notifications }) => {
  return (
    <div className="flex flex-col space-y-4">
      {notifications.map((notification) => (
        <InboxItem
          key={notification.id}
          title={notification.title}
          description={notification.description}
          time={notification.time}
          isHighlighted={notification.isHighlighted}
          isNew={notification.isNew}
        />
      ))}
    </div>
  );
};

export default InboxList;
