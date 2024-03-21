import { CurrentUserExchnageInterface } from "./Interfaces/CurrentUserExchnageInterface";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { setExchangeIdFromItem } from "../../../store/exchange-state/exhcnageFromItemsSlice";
import { setActiveModuleName } from "../../../store/moduleSlice";
import { setProfileUser } from "../../../store/user-state/profileUserSlice";
function classNames(
  ...classes: (string | undefined | null | boolean)[]
): string {
  return classes.filter(Boolean).join(" ");
}
function UserExchange({
  exchange,
}: {
  exchange: CurrentUserExchnageInterface;
}) {
  const dispatch = useDispatch();
  const showExhcnage = () => {
    dispatch(setExchangeIdFromItem(exchange.id));
    dispatch(setActiveModuleName("Exchanges"));
  };

  const goToProfile = () => {
    dispatch(setActiveModuleName("Friends"));
    dispatch(
      setProfileUser({
        email: "",
        id: exchange.pickUpPersonId.toString(),
        isFriend: true,
      })
    );
  };

  return (
    <div
      key={exchange.id}
      className="overflow-hidden rounded-xl border border-gray-200"
    >
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
        <div className="text-sm font-medium leading-6 text-gray-900">
          Name: {exchange.exchangeName}
        </div>
        <Menu as="div" className="relative ml-auto">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Open options</span>
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
            <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <p
                    onClick={() => {
                      showExhcnage();
                    }}
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    View
                    <span className="sr-only">, {exchange.exchangeName}</span>
                  </p>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <p
                    onClick={() => {
                      goToProfile();
                    }}
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    Go to friends profile
                    <span className="sr-only">, {exchange.friendName}</span>
                  </p>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 -my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="col-span-1">
          <dt className="text-gray-500">Pick up Date</dt>
          <dd className="text-gray-700">
            <time
              dateTime={
                exchange.pickUpDate
                  ? new Date(exchange.pickUpDate).toISOString()
                  : undefined
              }
            >
              {exchange.pickUpDate
                ? new Date(exchange.pickUpDate).toLocaleDateString()
                : "N/A"}
            </time>
          </dd>
        </div>
        <div className="col-span-1">
          <dt className="text-gray-500">State</dt>
          <dd className="text-gray-700">{exchange.exchangeState}</dd>
        </div>

        <div className="col-span-1">
          <dt className="text-gray-500">Items</dt>
          <dd className="text-gray-700">{exchange.numberOfItems}</dd>
        </div>
        <div className="col-span-1">
          <dt className="text-gray-500">Friend</dt>
          <dd className="text-gray-700">{exchange.friendName}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-gray-500">Price</dt>
          <dd className="text-gray-700">0</dd>
        </div>
      </dl>
    </div>
  );
}

export default UserExchange;
