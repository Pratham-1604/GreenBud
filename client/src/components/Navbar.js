import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/outline";

const Navbar = () => {

  return (
    <header className="bg-[#038373] rounded-b-xl shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
              alt="Logo"
            />
            <span className="ml-2 text-xl text-white font-semibold">
              G-Buddies
            </span>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Menu as="div" className="ml-8 relative">
              <div className="flex-grow">
                <Menu.Button className="w-[150px] p-2 bg-gray-100 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-cyan-700">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://i.pravatar.cc/300"
                    alt=""
                  />
                  <span className="text-lg mx-2">R.Vikas</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/profile"
                          onClick={() => console.log("Profile")}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm`}
                        >
                          Edit Profile
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/community"
                          onClick={() => console.log("Community")}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm`}
                        >
                          Community
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/login"
                          onClick={() => console.log("Logout")}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } block px-4 py-2 text-sm`}
                        >
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Link to="/notify">
              <button className="ml-2 relative">
                <BellIcon className="w-6 h-6 text-white" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white -mt-1 -mr-1">
                  5
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
