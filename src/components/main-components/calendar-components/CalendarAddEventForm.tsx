import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import { CreateEventDto } from "./dtos/CreateEventDto";
import { RootState } from "../../../store/store";
import axios from "axios";
import generateUrl from "../../../contants/url";

export default function CalendarAddEventForm({
  open,
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) {
  const cancelButtonRef = useRef(null);
  const { id } = useSelector((state: RootState) => state.user);

  const [eventName, setEventName] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [eventType, setEventType] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const eventTypes = [
    "Meeting",
    "Hookup",
    "Sport",
    "Activity",
    "Call",
    "Productive",
  ];
  const clearForm = () => {
    setEventName("");
    setEventType("");
    setEventDescription("");
    setStartTime("");
    setEndTime("");
    setErrorText("Create your event");
  };
  useEffect(() => {
    setErrorText("Create your event");
    clearForm();
  }, []);

  const createEvent = async () => {
    if (!eventName || !eventType || !startTime || !endTime) {
      setErrorText("Please fill all fields");
      return;
    }

    const createEventDto = new CreateEventDto(
      new Date(startTime),
      new Date(endTime),
      eventName,
      parseInt(id),
      eventDescription
    );

    try {
      await axios.post(generateUrl("event/create-event"), {
        createEvent: createEventDto,
      });
      setOpen(false);
      clearForm();
    } catch (error) {
      console.error("Error creating event:", error);
      setErrorText(
        "An error occurred while creating the event. Please try again."
      );
    }
  };
  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl p-6">
                <h1 className="text-lg font-semibold">{errorText}</h1>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                  >
                    <option value="">Select Event Type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <input
                    type="datetime-local"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={startTime}
                    min={new Date().toISOString().slice(0, 16)}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <input
                    type="datetime-local"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={endTime}
                    min={new Date().toISOString().slice(0, 16)}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                  <textarea
                    className="mt-1 block h-28 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-y"
                    placeholder="Additional Event Details..."
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row justify-around space-y-3 sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 w-48 flex items-center justify-center h-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => {
                      setOpen(false);
                      clearForm();
                    }}
                  >
                    Go back
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 w-48 flex items-center justify-center h-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={createEvent}
                  >
                    Create event
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
