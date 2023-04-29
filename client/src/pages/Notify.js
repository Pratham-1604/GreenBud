const notifications = [
  {
    id: 1,
    imageSrc: "https://via.placeholder.com/48",
    username: "John Doe",
    contactDetails: "johndoe@example.com",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    imageSrc: "https://via.placeholder.com/48",
    username: "Jane Smith",
    contactDetails: "janesmith@example.com",
    message: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    imageSrc: "https://via.placeholder.com/48",
    username: "Bob Johnson",
    contactDetails: "bjohnson@example.com",
    message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const Notify = () => {
  return (
    <div className="max-w-7xl h-screen mx-auto py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Notifications</h1>
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-lg shadow-md mb-4 flex">
            <div className="flex-none p-4">
              <img className="w-12 h-12 rounded-full" src={notification.imageSrc} alt={notification.username} />
            </div>
            <div className="flex-grow p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{notification.username}</span>
                <span className="text-sm text-gray-400">{notification.contactDetails}</span>
              </div>
              <div className="text-sm text-gray-600">{notification.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notify;
