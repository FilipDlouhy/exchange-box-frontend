import { defaultBackgroundImage } from "./Helpers/DefaultBackgroundImage";

function UserProfileImages({
  avatar,
  backgroundImage,
  handleAvatarChange,
  handleBackgroundChange,
  handleNameChange,
  name = "",
}: {
  handleBackgroundChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundImage: string | null | undefined;
  handleAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  avatar: string | null | undefined;
  name: string | undefined;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundChange}
          style={{ display: "none" }}
          id="background-input"
        />
        <label htmlFor="background-input">
          <img
            className="h-32 w-full object-cover lg:h-48 cursor-pointer"
            src={backgroundImage || defaultBackgroundImage}
            alt=""
          />
        </label>
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className=" w-full flex-wrap -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
              id="avatar-input"
            />
            <label htmlFor="avatar-input">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white bg-black sm:h-32 sm:w-32 cursor-pointer"
                src={avatar || ""}
                alt=""
              />
            </label>
          </div>
          <div className="mt-6 flex-wrap sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="truncate text-2xl font-bold text-gray-900"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-gray-900">{name}</h1>
        </div>
      </div>
    </div>
  );
}

export default UserProfileImages;
