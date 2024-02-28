import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { FormUser } from "./Interfaces/FormUser";
import { useFetchDataSimple } from "../../common-components/Hooks/FetchDataHookSimple";
import axios from "axios";
import generateUrl from "../../../contants/url";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ItemInterface } from "./Interfaces/ItemInterface";
import { resetItemToEdit } from "../../../store/item-state/itemToEditSlice";

export default function CreateEditItemForm({
  hadForgoten,
  open,
  setOpen,
  setItems,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  hadForgoten: boolean;
  setItems: React.Dispatch<React.SetStateAction<ItemInterface[] | undefined>>;
}) {
  const [formItemData, setformItemData] = useState({
    name: "",
    length: "",
    width: "",
    height: "",
    weight: "",
  });
  const [friends, setFriends] = useState<FormUser[]>([]);
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedFriend, setSelectedFriend] = useState<FormUser>();
  const [file, setFile] = useState<File | null>(null);
  const [errorText, setErrorText] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.user.id);
  const itemToEdit: ItemInterface = useSelector(
    (state) => state.itemToEdit.item
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setErrorText(isEditing ? "Edit item" : "Create item");
    if (itemToEdit != null) {
      setIsEditing(true);
      setformItemData({
        name: itemToEdit.name,
        length: itemToEdit.length.toString(),
        width: itemToEdit.width.toString(),
        height: itemToEdit.height.toString(),
        weight: itemToEdit.weightInGrams.toString(),
      });

      const foundFriend = friends.find(
        (friend) => friend.id === itemToEdit.friendId
      );

      if (foundFriend) {
        setSelectedName(foundFriend?.name);

        setSelectedFriend(foundFriend);
      }
    } else {
      setIsEditing(false);
      emptyForm();
    }
  }, [open, itemToEdit]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedName(e.target.value);

    const foundFriend = friends.find(
      (friend) => friend.name === e.target.value
    );

    setSelectedFriend(foundFriend);
  };

  const areAllFieldsFilled = (): boolean => {
    const { name, length, width, height, weight } = formItemData;
    return (
      name !== "" &&
      length !== "" &&
      width !== "" &&
      height !== "" &&
      weight !== ""
    );
  };

  useFetchDataSimple<FormUser[]>(
    "user/get-friends-for-item-creation",
    setFriends
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformItemData((prevformItemData) => ({
      ...prevformItemData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const modifiedFile = new File([file], "imageUrl" + ".jpg", {
        type: file.type,
      });

      setFile(modifiedFile);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!areAllFieldsFilled()) {
      setErrorText("Fill all fields");
      return;
    }

    if (!selectedFriend) {
      setErrorText("Select user");
      return;
    }

    const formData = new FormData();

    formData.append("name", formItemData.name);
    formData.append("length", formItemData.length);
    formData.append("width", formItemData.width);
    formData.append("height", formItemData.height);
    formData.append("weight", formItemData.weight);
    formData.append(
      "friendId",
      !hadForgoten ? String(selectedFriend?.id) : userId
    );
    formData.append(
      "userId",
      !hadForgoten ? userId : String(selectedFriend?.id)
    );

    if (!isEditing && !file) {
      setErrorText("Add image");
      return;
    }

    if (isEditing) {
      formData.append("id", itemToEdit.id.toString());
    }

    if (file) {
      formData.append("images", file);
    }

    const { data } = await axios.post(
      generateUrl(isEditing ? "item/update-item" : "item/create-item"),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (isEditing) {
      setItems((prevItems) => {
        const index = (prevItems || []).findIndex(
          (item) => item.id === data.id
        );
        if (index !== -1) {
          const updatedItems = [...(prevItems || [])];
          updatedItems.splice(index, 1, data);
          return updatedItems;
        }
        return prevItems;
      });
    } else {
      setItems((prevItems) => [...(prevItems || []), data]);
    }

    setOpen(false);

    emptyForm();
  };

  const emptyForm = () => {
    setformItemData({
      name: "",
      length: "",
      width: "",
      height: "",
      weight: "",
    });

    setFile(null);
  };

  const selectedNameObject = friends.find(
    (friend) => friend.name === selectedName
  );

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpen(false);
          dispatch(resetItemToEdit());
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden w-96 rounded-lg bg-white h-96  text-left shadow-xl transition-all  ">
                <form>
                  <p className="text-center text-2xl pt-1 font-semibold">
                    {errorText}
                  </p>
                  <div className=" h-72 flex flex-col items-center justify-around">
                    <input
                      type="text"
                      name="name"
                      placeholder="Item Name"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formItemData.name}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      name="length"
                      placeholder="Length"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formItemData.length}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      placeholder="Width"
                      name="width"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formItemData.width}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      placeholder="Height"
                      name="height"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formItemData.height}
                      onChange={handleInputChange}
                    />

                    <input
                      type="number"
                      placeholder="Weight"
                      name="weight"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={formItemData.weight}
                      onChange={handleInputChange}
                    />

                    <input
                      type="file"
                      accept="image/*"
                      id="background-input"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                    />
                    <select
                      value={selectedName}
                      onChange={(e) => {
                        handleUserChange(e);
                      }}
                      className="w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select a name</option>
                      {friends.map((name, index) => (
                        <option key={index} value={name.name}>
                          {name.name}
                        </option>
                      ))}
                    </select>
                    {selectedName && (
                      <div className="mt-4 flex items-center">
                        {selectedNameObject?.imageUrl ? (
                          <img
                            src={selectedNameObject?.imageUrl}
                            alt={selectedName}
                            style={{ width: 50, marginRight: 10 }}
                          />
                        ) : (
                          <UserIcon style={{ width: 50, marginRight: 10 }} />
                        )}
                        <span>{selectedName}</span>
                      </div>
                    )}
                  </div>
                  <div className="h-16 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                      }}
                      className="w-40 mx-auto rounded-md flex items-center justify-center bg-indigo-600 h-9 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Go back
                    </button>

                    <button
                      onClick={(e) => {
                        handleSubmit(e);
                      }}
                      className="w-40 mx-auto rounded-md flex items-center justify-center bg-indigo-600 h-9 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {isEditing ? "Edit item" : "Create item"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
