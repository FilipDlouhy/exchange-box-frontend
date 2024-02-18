import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function CreateItemForm({
  open,
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}) {
  const [name, setName] = useState<string>("");
  const [length, setLength] = useState<string>("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [selectedName, setSelectedName] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const names = [
    { name: "Alice", imageUrl: "/path/to/alice.jpg" },
    { name: "Bob", imageUrl: "/path/to/bob.jpg" },
  ];

  const handleFileChange =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      if (file) {
        const fileURL = URL.createObjectURL(file);
        const modifiedFile = new File([file], field + ".jpg", {
          type: file.type,
        });

        setFile(modifiedFile);
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    setOpen(false);
  };

  const selectedNameObject = names.find((name) => name.name === selectedName);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                <form onSubmit={handleSubmit}>
                  <p className="text-center text-2xl pt-1 font-semibold">
                    Create item
                  </p>
                  <div className=" h-72 flex flex-col items-center justify-around">
                    <input
                      type="text"
                      placeholder="Item Name"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Length"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Width"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Height"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Weight"
                      className="w-5/6  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />

                    <input
                      type="file"
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
                      onChange={(e) => setSelectedName(e.target.value)}
                      className="w-5/6 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="">Select a name</option>
                      {names.map((name, index) => (
                        <option key={index} value={name.name}>
                          {name.name}
                        </option>
                      ))}
                    </select>
                    {selectedName && (
                      <div className="mt-4 flex items-center">
                        <img
                          src={selectedNameObject?.imageUrl}
                          alt={selectedName}
                          style={{ width: 50, marginRight: 10 }}
                        />
                        <span>{selectedName}</span>
                      </div>
                    )}
                  </div>
                  <div className="h-16 flex items-center justify-center">
                    <button
                      type="submit"
                      className="w-40 mx-auto rounded-md flex items-center justify-center bg-indigo-600 h-9 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Go back
                    </button>

                    <button
                      type="submit"
                      className="w-40 mx-auto rounded-md flex items-center justify-center bg-indigo-600 h-9 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Create Item
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
