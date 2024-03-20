import { CurrentUserItemInterface } from "./Interfaces/CurrentUserItemInterface";

const UserItems = ({
  userItems,
}: {
  userItems: CurrentUserItemInterface[] | undefined;
}) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Your items
        </h2>
        <div className="flex flex-wrap">
          {userItems?.map((item) => (
            <div key={item.id} className="w-48 h-60 m-3 shadow-xl rounded-md">
              <div className="rounded-md bg-gray-200 h-36">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={`Image of ${item.name}`}
                    className="h-full w-full object-cover object-center"
                  />
                )}
              </div>
              <div className="mt-4 flex justify-center">
                <div>
                  <h3 className="text-sm text-gray-700">Name: {item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Width: {item.width} cm, Height: {item.height} cm
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Weight: {item.weight} g
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserItems;
