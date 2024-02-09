import { useEffect, useState } from "react";
import { handleInputChange } from "./Helpers/InputHelper";
import axios from "axios";
import generateUrl from "../../contants/url";
import { LoginUserDto } from "../../Dtos/UserDtos/login.user.dto";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user-state/userSlice";
export default function LoginForm({
  setIsLoggingIn,
  setIsChnagingPassword,
}: {
  setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChnagingPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setErrorText("Log in to Exchange box");
  }, []);

  const login = async () => {
    const url = generateUrl("auth/login");
    const loginUserDto = new LoginUserDto(email, password);

    try {
      const response = await axios.post(url, loginUserDto);
      const { access_token } = response.data;

      if (access_token) {
        Cookies.set("jwtToken", access_token, { expires: 7 });
        const getUrl = generateUrl("auth/get-user-by-token");
        const response = await axios.get(getUrl, { withCredentials: true });

        const {
          name,
          email,
          id,
          telephone,
          longitude,
          latitude,
          address,
          imageUrl,
        } = response.data;

        dispatch(
          setUser({
            name,
            email,
            id,
            telephone,
            longitude,
            latitude,
            address,
            imageUrl,
          })
        );
        navigate("/exchange-box");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="flex w-screen h-screen flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2
                className={`mt-8 text-2xl font-bold leading-9 tracking-tight ${
                  errorText !== "Log in to Exchange box"
                    ? "text-red-500"
                    : "text-gray-900"
                }`}
              >
                {errorText}
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        onChange={(e) => {
                          handleInputChange(e, setEmail);
                        }}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={(e) => {
                          handleInputChange(e, setPassword);
                        }}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-sm leading-6">
                      <p
                        onClick={() => {
                          setIsChnagingPassword(true);
                        }}
                        className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </p>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        login();
                      }}
                      type="submit"
                      className="flex my-6 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => {
                        setIsLoggingIn(false);
                        setIsChnagingPassword(true);
                      }}
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Do not have an account? Create one
                    </button>
                  </div>
                </form>
              </div>
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
    </>
  );
}
