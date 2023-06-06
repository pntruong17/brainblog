import React, { useState } from "react";
import { useUserAuth } from "../helper/UserAuthContextProvider";
import { useRouter } from "next/router";
import SignIn from "../SignInForm";
import SignUp from "../SignUpForm";
import axios from "axios";

// const sample_userdata = {
//   uid: user.uid,
//   displayName: user.displayName,
//   email: user.email,
//   photoURL: user.photoURL,
//   numberTestRemain: 0,
//   education: "",
//   yourdata: {
//     iqlvl: "",
//     age: "",
//     country: "",
//   },
// };

const GetStartedForm = ({ userExistance }) => {
  const [hasAcc, setHasAcc] = useState(true);
  const { googleSignIn, user } = useUserAuth();
  const navigate = useRouter();

  const googleLogin = async () => {
    const login = await googleSignIn();
    const credentials = login.user.uid;
    const user = await axios.post("/api/auth/login", credentials);
    console.log(login.user.uid);
    navigate.push("/");
  };
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="w-full px-3 py-5 md:py-24 mx-auto flex flex-wrap items-center">
          <div className="max-w-lg bg-white rounded-lg border shadow-md p-5 md:p-8 flex flex-col mx-auto w-full mt-0">
            <p className="font-semibold text-2xl text-_darkblue mt-3 text-center mb-10">
              Please sign in to use our service
            </p>
            <button
              type="button"
              className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                ></path>
              </svg>
              Sign in with Facebook
            </button>
            <button
              onClick={googleLogin}
              type="button"
              className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign in with Google
            </button>
            <p className="font-semibold text-lg text-_darkblue mt-10 text-center mb-5">
              {hasAcc
                ? "Or sign in with email and password"
                : "Create a new account"}
            </p>
            <div className={`${hasAcc ? "" : "hidden"}`}>
              <SignIn />
            </div>
            <div className={`${!hasAcc ? "" : "hidden"}`}>
              <SignUp />
            </div>
            <p
              className={`font-Albert text-base text-_darkblue mt-3 text-left mb-10 ${
                hasAcc ? "" : "hidden"
              }`}
            >
              Create an account with{" "}
              <span
                onClick={() => setHasAcc(false)}
                className="text-_green cursor-pointer hover:underline"
              >
                email and password
              </span>
            </p>
            <p
              className={`font-Albert text-base text-_darkblue mt-3 text-left mb-10 ${
                !hasAcc ? "" : "hidden"
              }`}
            >
              I have an{" "}
              <span
                onClick={() => setHasAcc(true)}
                className="text-_green cursor-pointer hover:underline"
              >
                account
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetStartedForm;
