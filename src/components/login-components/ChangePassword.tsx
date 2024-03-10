import { useState } from "react";
import { handleChangePasswordHelper } from "./helpers/ChangePasswordHelper";
import { FormProps } from "./props/FormProps";

export default function ChangePassword({
  setIsLoggingIn,
  setIsChnagingPassword,
}: FormProps) {
  const [prevPassword, setPrevPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async (e) => {
    try {
      e.preventDefault();
      await handleChangePasswordHelper({
        email: email,
        prevPassword: prevPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      setPrevPassword("");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
      setIsLoggingIn(true);
    } catch (error) {
      console.error("Error occurred during password change:", error);
    }
  };

  const handleBack = () => {
    setIsLoggingIn(true);
    setIsChnagingPassword(false);
  };

  return (
    <div className="flex w-screen h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className={`mt-8 text-2xl font-bold leading-9 tracking-tight `}>
              Change password
            </h2>
          </div>

          <div className="mt-10">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="prevPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 shadow-lg block w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="prevPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Previous Password
                </label>
                <input
                  id="prevPassword"
                  name="prevPassword"
                  value={prevPassword}
                  type="password"
                  required
                  onChange={(e) => setPrevPassword(e.target.value)}
                  className="h-8 shadow-lg block w-full rounded-md border-gray-300  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-8 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className=" h-8 block w-full rounded-md border-gray-300 shadow-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  type="button"
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Go Back
                </button>
                <button
                  onClick={handleChangePassword}
                  type="submit"
                  className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
}
