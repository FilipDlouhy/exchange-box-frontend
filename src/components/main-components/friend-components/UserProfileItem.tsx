import { IUserProfileItem } from "./Interfaces/UserProfileInterface";

const UserProfileItem = ({ item }: { item: IUserProfileItem }) => {
  return (
    <li
      key={item.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg mx-4 bg-white shadow overflow-hidden"
    >
      <div className="w-full">
        {item.imageURL ? (
          <img
            className="w-full h-56 object-cover object-center"
            src={item.imageURL}
            alt={item.name}
          />
        ) : (
          <div className="w-full h-56 object-cover object-center"></div>
        )}
      </div>
      <div className="flex flex-col p-6 space-y-3">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
          </div>
        </div>
        <div className="text-lg font-semibold flex w-full justify-around">
          <p className="text-gray-900">
            Weight: <span className="font-semibold">{item.weightInGrams}</span>
          </p>
          <p className="text-gray-900">
            Length: <span className="font-semibold">{item.lengthInCm}</span>
          </p>
          <p className="text-gray-900">
            Height: <span className="font-semibold">{item.heightInCm}</span>
          </p>
          <p className="text-gray-900">
            Width: <span className="font-semibold">{item.widthInCm}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default UserProfileItem;
