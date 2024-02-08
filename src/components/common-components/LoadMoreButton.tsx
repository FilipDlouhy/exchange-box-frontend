import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { incrementStarting } from "../../store/paginationSlice";

const LoadMoreButton = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-full h-12 flex items-center justify-center mt-3 mb-4">
      <button
        type="button"
        className="rounded-md bg-indigo-600 w-48 h-10 mx-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => {
          dispatch(incrementStarting());
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreButton;