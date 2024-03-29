import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Logo from "../assets/logo.png";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  classNames,
  initialNavigation,
  userNavigation,
} from "./helpers/ExchangeHelper";
import ErrorModal from "../components/common-components/ErrorModal";
import SearchInput from "../components/common-components/SearchInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveModuleName } from "../store/moduleSlice";
import { RootState } from "../store/store";
import NotificationsDialog from "../components/common-components/Notifications/NotificationsDialog";
import io from "socket.io-client";
import axios from "axios";
import generateUrl from "../contants/url";
import { NotificationEvent } from "../components/common-components/Notifications/interfaces/NotificationEventInterface";
import { getMainComponentByName } from "../components/main-components/Helpers/Navigations";
import InfoModal from "../components/common-components/InfoModal";

export default function ExchangeBox() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState(initialNavigation);
  const [mainComponent, setMainComponent] = useState<JSX.Element | null>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [numberOfNotifications, setNumberOfNotifications] = useState<number>(0);

  const activeModuleName = useSelector(
    (state) => state.activeModule.nameOfActiveModule
  );

  const updateCurrentToFalse = (nameToUpdate: string) => {
    if (nameToUpdate.length === 0) {
      return;
    }

    const updatedNavigation = navigation.map((item) => {
      if (item.name === nameToUpdate) {
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });

    setNavigation(updatedNavigation);
    localStorage.setItem("menu_item", JSON.stringify(nameToUpdate));

    setMainComponent(getMainComponentByName(nameToUpdate));
  };

  const getNumberOfNotifications = async () => {
    const response = await axios.get(
      generateUrl("notification/get-number-of-notifications"),
      { withCredentials: true }
    );

    setNumberOfNotifications(response.data);
  };

  useEffect(() => {
    const menuData = localStorage.getItem("menu_item");
    if (menuData) {
      const parsedMenuData = JSON.parse(menuData);
      updateCurrentToFalse(parsedMenuData);
    }

    const socket = io("http://localhost:3000");
    socket.on("notification", (data: NotificationEvent) => {
      setNumberOfNotifications(data.notificationCount);
    });
    getNumberOfNotifications();
    return () => socket.off("notification");
  }, []);

  useEffect(() => {
    updateCurrentToFalse(activeModuleName);
  }, [activeModuleName]);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-blue-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-blue-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src={Logo}
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="-mx-2 flex-1 space-y-1">
                        {navigation.map((item) => (
                          <li className="cursor-pointer" key={item.name}>
                            <p
                              className={classNames(
                                item.current
                                  ? "bg-blue-800 text-white cursor-pointer "
                                  : "text-blue-400 hover:text-white hover:bg-blue-800 cursor-pointer",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                              )}
                            >
                              <item.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {item.name}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-24 lg:overflow-y-auto lg:bg-blue-500 lg:pb-4">
          <div className="flex h-16 shrink-0 items-center justify-center">
            <img className="h-8 w-auto" src={Logo} alt="Your Company" />
          </div>
          <nav className="mt-8">
            <ul
              role="list"
              className="flex flex-col items-center cursor-pointer space-y-1"
            >
              {navigation.map((item) => (
                <li
                  onClick={() => {
                    dispatch(setActiveModuleName(item.name));
                  }}
                  key={item.name}
                >
                  <p
                    className={classNames(
                      item.current
                        ? "bg-blue-800 text-white"
                        : "text-blue-400 hover:text-white hover:bg-blue-800",
                      "group flex gap-x-3  p-3 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0 mx-auto"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{item.name}</span>
                  </p>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="lg:pl-24">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-blue-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-blue-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-blue-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="relative flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <SearchInput />
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  onClick={() => {
                    setOpenNotifications(true);
                  }}
                  type="button"
                  className="-m-2.5 p-2.5 text-blue-400 hover:text-blue-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />

                  <div className="absolute w-6 h-6 top-3 flex justify-center items-center text-white ml-3 text-xs font-semibold bg-blue-600 rounded-full">
                    {numberOfNotifications}
                  </div>
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-blue-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-blue-50"
                      src={user.imageUrl ? user.imageUrl : Logo}
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-blue-900"
                        aria-hidden="true"
                      >
                        {user.name}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-blue-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-blue-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <p
                              onClick={() => {
                                if (item.name === "Your profile") {
                                  dispatch(setActiveModuleName("User"));
                                  return;
                                }
                                document.cookie
                                  .split(";")
                                  .forEach(function (cookie) {
                                    document.cookie = cookie
                                      .replace(/^ +/, "")
                                      .replace(
                                        /=.*/,
                                        "=;expires=" +
                                          new Date().toUTCString() +
                                          ";path=/"
                                      );
                                  });

                                navigate("/");
                              }}
                              className={classNames(
                                active ? "bg-blue-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-blue-900"
                              )}
                            >
                              {item.name}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main>
            <div>{mainComponent}</div>
          </main>
        </div>
      </div>

      <ErrorModal />

      <InfoModal />

      <NotificationsDialog
        numberOfNotifications={numberOfNotifications}
        setNumberOfNotifications={setNumberOfNotifications}
        openNotifications={openNotifications}
        setOpenNotifications={setOpenNotifications}
      />
    </>
  );
}
