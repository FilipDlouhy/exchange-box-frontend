import { XMarkIcon } from "@heroicons/react/24/outline";

function Notification() {
  return (
    <div className="col-span-1 flex rounded-md shadow-sm my-2">
      <div
        className={
          "flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white bg-black"
        }
      >
        HO
      </div>
      <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
        <div className="flex-1 truncate px-4 py-2 text-sm">
          <p className="font-medium text-gray-900 hover:text-gray-600">
            23.4 20224
          </p>
          <p className="text-gray-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
            quam ab asperiores quo! Deleniti, eligendi, cum nobis delectus
            magnam maxime assumenda, ut aperiam voluptate voluptas nulla debitis
            doloremque harum sunt.
          </p>
        </div>
        <div className="flex-shrink-0 pr-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notification;
