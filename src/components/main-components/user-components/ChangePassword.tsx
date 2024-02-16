import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { handleChangePasswordHelper } from "../../login-components/Helpers/ChangePasswordHelper";

export default function ChangePassword({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState({
    email: "",
    prevPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      e.preventDefault();
      await handleChangePasswordHelper({
        email: formData.email,
        prevPassword: formData.prevPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setFormData({
        email: "",
        prevPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setOpen(false);
    } catch (error) {
      console.error("Error occurred during password change:", error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpen(false);
          setFormData({
            email: "",
            prevPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-md transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <LockClosedIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Change Password
                    </Dialog.Title>
                    <div className="mt-2 space-y-4">
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Email"
                        className="w-full my-3 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        name="prevPassword"
                        required
                        placeholder="Previous Password"
                        className="w-full my-3  rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.prevPassword}
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        name="newPassword"
                        required
                        placeholder="New Password"
                        className="w-full my-3  rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Confirm New Password"
                        className="w-full my-3  rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex w-full my-3  justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    >
                      Change Password
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
