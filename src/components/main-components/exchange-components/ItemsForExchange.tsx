import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { ExchangeItemInterface } from "./Interfaces/ExchnageItem";

function classNames(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}
export default function ItemsForExchange({
  itemsSimple,
  handleItemsInExchangeChange,
  itemsInExchnage,
}: {
  itemsSimple: ExchangeItemInterface[] | undefined;
  handleItemsInExchangeChange: (id: number, isAdding: boolean) => void;
  itemsInExchnage: number[];
}) {
  return (
    <div
      role="list"
      className="grid grid-cols-1 gap-x-6 my-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {itemsSimple?.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <div className="text-sm font-medium leading-6 text-gray-900">
              {item.name}
            </div>
            <Menu as="div" className="relative ml-auto">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
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
                <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        onClick={() => {
                          handleItemsInExchangeChange(
                            item.id,
                            !itemsInExchnage?.includes(item.id)
                          );
                        }}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        {itemsInExchnage?.includes(item.id) ? "Remove" : "Add"}
                        <span className="sr-only">
                          , {item.name} to exchnage
                        </span>
                      </p>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Height?: {item.height} cm</dt>
              <dd className="text-gray-500">
                <p>Width: {item.width} cm</p>
              </dd>
            </div>
            <div className="flex justify-between gap-x-4 py-3">
              <dt className="text-gray-500">Weight: {item.weightInGrams} g</dt>
              <dd className="flex items-start gap-x-2">
                <div className="text-gray-500">Length {item.length} cm</div>
              </dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
