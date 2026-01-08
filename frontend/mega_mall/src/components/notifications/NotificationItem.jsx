const NotificationItem = ({ note, onRead }) => {
  return (
    <div
      className={`p-3 rounded mb-2 flex justify-between items-center ${
        note.is_read ? "bg-gray-200" : "bg-blue-100"
      }`}
    >
      <span>{note.message}</span>

      {!note.is_read && (
        <button
          onClick={() => onRead(note.id)}
          className="text-sm bg-blue-600 text-white px-2 py-1 rounded"
        >
          Mark Read
        </button>
      )}
    </div>
  );
};

export default NotificationItem;
