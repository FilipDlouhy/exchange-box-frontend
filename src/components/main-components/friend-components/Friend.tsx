import {
  EnvelopeIcon,
  UserCircleIcon,
  ArchiveBoxIcon,
  UserPlusIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { FriendInfo } from "./Interfaces/FriendInterface";

export default function Friend({
  person,
  isFriend,
}: {
  person: FriendInfo;
  isFriend: boolean;
}) {
  return (
    <li
      key={person.email}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {person.name}
            </h3>
            {person.address && (
              <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Lives in{person.address}
              </span>
            )}
          </div>
          {person.telephone && (
            <p className="mt-1 truncate text-sm text-gray-500">
              Tel: {person.telephone}
            </p>
          )}
        </div>
        {person.imageUrl ? (
          <img
            className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
            src={person.imageUrl}
            alt=""
          />
        ) : (
          <div className="h-10 w-10 flex-shrink-0 ">
            <UserCircleIcon />
          </div>
        )}
      </div>
      {isFriend ? (
        <div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <p className=" cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <EnvelopeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Send Message
                </p>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <p className=" cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <UserPlusIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Go to Profile
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <p className=" cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <ArchiveBoxIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Add Item to Person
                </p>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <p className=" cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <BuildingOfficeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  See exchanges
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <p className=" cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <UserPlusIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Add as a friend
              </p>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <p className=" cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <UserCircleIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Go to Profile
              </p>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
