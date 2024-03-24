import { Fragment } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { CalendarViewEnum } from "./helpers/CalendarViewEnum";
import { classNames } from "../../../pages/helpers/ExchangeHelper";

function CalendarHeader({
  setCalendarView,
  setOpen,
  calendarView,
  monthName,
}: {
  setCalendarView: React.Dispatch<React.SetStateAction<CalendarViewEnum>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  calendarView: CalendarViewEnum;
  monthName?: string;
  calendarManipulationFunction?: any;
}) {
  const handleDateChange = (e) => {
    setCalendarView(e.target.value);
  };
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        <time dateTime="2022-01">{monthName}</time>
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:ml-4 md:flex items-center">
          <div className="relative z-10">
            <select
              value={calendarView}
              onChange={handleDateChange}
              className="block w-full  bg-white origin-top-right rounded-md border-2 border-gray-300 focus:border-indigo-600 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 hover:border-gray-400 transition duration-150 ease-in-out"
            >
              <option value={CalendarViewEnum.DAY}>Day view</option>
              <option value={CalendarViewEnum.WEEK}>Week view</option>
              <option value={CalendarViewEnum.MONTH}>Month view</option>
            </select>
          </div>
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <button
            onClick={() => {
              setOpen(true);
            }}
            type="button"
            className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add event
          </button>
        </div>
        <Menu as="div" className="relative ml-6 md:hidden">
          <Menu.Button className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <p
                      onClick={() => {
                        setOpen(true);
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Create event
                    </p>
                  )}
                </Menu.Item>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <p
                      onClick={() => {
                        setCalendarView(CalendarViewEnum.DAY);
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Day view
                    </p>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <p
                      onClick={() => {
                        setCalendarView(CalendarViewEnum.WEEK);
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Week view
                    </p>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <p
                      onClick={() => {
                        setCalendarView(CalendarViewEnum.MONTH);
                      }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Month view
                    </p>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}

export default CalendarHeader;
