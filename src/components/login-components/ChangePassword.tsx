import { useState } from "react";
import { FormProps } from "./props/FormProps";
import { handleChangePasswordHelper } from "./helpers/ChangePasswordHelper";

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
    <div className="flex w-screen h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-8 text-3xl font-extrabold text-gray-900">
              Change Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your details to change your password.
            </p>
          </div>

          <div className="mt-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="prevPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Previous Password
                </label>
                <input
                  id="prevPassword"
                  name="prevPassword"
                  type="password"
                  value={prevPassword}
                  required
                  onChange={(e) => setPrevPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="flex items-center flex-col justify-between">
                <button
                  onClick={handleBack}
                  type="button"
                  className="inline-flex my-5 w-full items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Go Back
                </button>
                <button
                  onClick={handleChangePassword}
                  type="submit"
                  className="inline-flex items-center w-full justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
          alt="Background"
        />
      </div>
    </div>
  );
}
