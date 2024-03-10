import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { ItemSimpleInterafce } from "../interfaces/FullExchangeInterface";

export default function ExchangeDetailItems({
  items,
}: {
  items: ItemSimpleInterafce[] | undefined;
}) {
  return (
    <div className="flex flex-wrap w-full justify-center sm:justify-start  px-5 my-8">
      {items?.map((items) => (
        <div className="flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow p-4  w-72 h-80 mx-4 ">
          <div className="flex flex-1 flex-col p-4">
            {items.imageUrl ? (
              <img
                className="mx-auto h-32 w-32 flex-shrink-0"
                src={items.imageUrl}
                alt=""
              />
            ) : (
              <ArchiveBoxIcon className="mx-auto h-32 w-32 flex-shrink-0" />
            )}
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {items.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{items.name}</dd>
              <dt className="sr-only">Details</dt>
              <dd className="mt-3">
                <div className="inline-flex flex-col items-center justify-center">
                  <span className="inline-flex w-full justify-center items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    {`Length: ${items.length || "N/A"}cm`} ·
                    {`Width: ${items.width || "N/A"}cm`}
                  </span>
                  <span className="mt-1 inline-flex w-full justify-center items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    {`Height: ${items.height || "N/A"} cm`} ·
                    {`Weight: ${items.weightInGrams}g`}
                  </span>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
