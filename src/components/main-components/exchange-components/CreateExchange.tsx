import LocationMap from "../../common-components/LocationMap";
import ItemsForExchange from "./ItemsForExchange";

function CreateExchange() {
  const handleCoordinatesChange = (lat: any, lng: any) => {};
  return (
    <div>
      <div className="w-full h-28 flex justify-around flex-col">
        <h1 className="font-semibold ml-8">Create Exchange</h1>
        <button
          onClick={() => {}}
          type="button"
          className="rounded bg-blue-500 ml-8 w-40 h-7 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-8 w-full">
        <form className="w-full sm:w-3/4 md:w-1/2">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="size"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Size
            </label>
            <select
              id="size"
              name="size"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="large">Large</option>
              <option value="medium">Medium</option>
              <option value="small">Small</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              htmlFor="other"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select user
            </label>
            <select
              id="other"
              name="other"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></select>
          </div>

          <div className="w-full my-3 ">
            <h1 className="my-3 font-semibold text-2xl">
              Choose location for exchange
            </h1>
            <LocationMap
              handleCoordinatesChange={handleCoordinatesChange}
              position={[44, 55]}
            />
          </div>
        </form>
        <ItemsForExchange />
        <div className=" my-6 flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          >
            Create exchange
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateExchange;
