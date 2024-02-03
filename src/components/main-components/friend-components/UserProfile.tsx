import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { resetProfileUser } from "../../../store/user-state/profileUserSlice";

function UserProfile() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-full h-full p-5">
      <div className="w-full h-20">
        <button
          onClick={() => {
            dispatch(resetProfileUser());
          }}
          type="button"
          className="rounded-md bg-blue-500 w-32 h-8 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back
        </button>

        <div className="w-full flex h-96 flex-wrap justify-center items-center">
          <div className="w-1/2 min-w-96 h-full"></div>
          <div className="w-1/2  min-w-96 h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
