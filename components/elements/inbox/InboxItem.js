const InboxItem = ({ title, description, time, isHighlighted, isNew }) => {
  return (
    <div
      className={`flex items-start justify-between border-b p-4 transition-all duration-300 ${
        isHighlighted ? "" : "border-primary hover:bg-gray-100 hover:shadow-md"
      }`}
    >
      {/* Konten Teks */}
      <div className="flex flex-col">
        <h4 className="text-lg font-bold text-primary">{title}</h4>
        <p className="text-sm text-primary">{description}</p>
      </div>

      {/* Informasi Waktu dan Tanda Baru */}
      <div className="flex items-center gap-3">
        <p className="text-sm text-primary">{time}</p>
        {isNew && <div className="mt-1 h-3 w-3 rounded-full bg-primary"></div>}
      </div>
    </div>
  );
};

export default InboxItem;
