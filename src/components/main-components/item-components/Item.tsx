import { ItemInterface } from "./Interfaces/ItemInterface";

function Item({
  item,
  showYourItems,
}: {
  item: ItemInterface;
  showYourItems: boolean;
}) {
  return (
    <div className=" w-96 h-80 shadow-xl m-5 rounded-sm  group relative">
      <div className="w-full h-1/2">
        <img className="h-full w-full" src={item.imageURL} />
      </div>
      <div className="w-full h-1/2 justify-between">
        <div className="w-full h-1/3 flex">
          <div className="w-1/2 h-full flex justify-start pl-1 items-center">
            <p className="text-lg font-semibold">
              Name:<span className="text-blue-700 font-bold">{item.name} </span>
            </p>
          </div>
          <div className="w-1/2 h-full flex justify-start pl-1 items-center">
            <p className="text-lg font-semibold">
              Owner:{" "}
              <span className="text-blue-700 font-bold">{item.ownerName}</span>
            </p>
          </div>
        </div>
        <div className="w-full  h-1/3">
          <div className="w-full h-1/2 justify-between items-center px-10 flex">
            <p className="text-sm text-gray-700">
              Length: <span className="font-medium">{item.length} cm</span>
            </p>
            <p className="text-sm text-gray-700">
              Width: <span className="font-medium">{item.length} cm</span>
            </p>
          </div>

          <div className="w-full h-1/2 justify-between items-center px-10 flex">
            <p className="text-sm text-gray-700">
              Height: <span className="font-medium">{item.height} cm</span>
            </p>
            <p className="text-sm text-gray-700">
              Weight:{" "}
              <span className="font-medium">{item.weightInGrams} g</span>
            </p>
          </div>
        </div>
        {showYourItems ? (
          <div className="w-full h-1/3 flex items-center justify-around ">
            <button
              type="button"
              className="rounded-md bg-indigo-600 w-28  h-9 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit item
            </button>

            <button
              type="button"
              className="rounded-md bg-indigo-600  w-28  h-9 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Show exchange
            </button>
            <button
              type="button"
              className="rounded-md bg-indigo-600  w-28  h-9 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete item
            </button>
          </div>
        ) : (
          <div className="w-full h-1/3 flex items-center justify-around ">
            <button
              type="button"
              className="rounded-md bg-indigo-600 w-28  h-9 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create exchange
            </button>

            <button
              type="button"
              className="rounded-md bg-indigo-600  w-28  h-9 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Show exchange
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Item;
