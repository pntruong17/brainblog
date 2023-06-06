import React from "react";
import { useUserAuth } from "./helper/UserAuthContextProvider";
import { useRouter } from "next/router";

const LoginForm = () => {
  const { googleSignIn } = useUserAuth();
  const navigate = useRouter();

  const GoogleLogin = () => {
    googleSignIn().then(() => {
      navigate.push("/");
    });
  };
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="max-w-lg bg-white rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 shadow-2xl">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign in to use the service
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white bg-black border border-black py-2 px-8 focus:outline-none hover:bg-white hover:text-black rounded text-lg transition duration-100">
              Sign In
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Literally you probably haven&apos;t heard of them jean shorts.
            </p>
            <p className="text-md text-gray-500 mt-3 text-center">
              Or sign in with
            </p>
            <button
              onClick={GoogleLogin}
              className="text-green-700 bg-white p-3 w-full justify-center border border-green-700 font-medium rounded-full flex align-middle gap-2 hover:font-semibold"
            >
              <i className="fa-brands fa-google"></i>
              Sign in with Google
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
