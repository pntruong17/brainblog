import { useState } from "react";
import { useRouter } from "next/router";
import { useUserAuth } from "./helper/UserAuthContextProvider";
import ReCAPTCHA from "react-google-recaptcha";
import Head from "next/head";

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isCaptchaVerified) {
        // here -> isCaptchaVerified
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
        } else if (!isValidPassword(password)) {
          setError(
            "Password must have at least one special character, one number, one lowercase, one uppercase letter and 8 characters"
          );
        } else {
          await signUp(email, password);
          router.push("/");
        }
      } else {
        setError("Please verify that you're not a robot.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const isValidPassword = (password) => {
    console.log(password);
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/;
    return regex.test(password);
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    setIsCaptchaVerified(true);
  };

  return (
    <div>
      <Head>
        <script
          async
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        ></script>
      </Head>

      <form onSubmit={handleSubmit}>
        <div className="w-full flex items-center mb-3">
          <label
            className="mr-5 flex-1 text-right font-medium text-sm"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-3/4 px-5 py-1 border rounded-lg"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center mb-3">
          <label
            className="mr-5 flex-1 text-right font-medium text-sm"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-3/4 px-5 py-1 border rounded-lg"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center mb-3">
          <label
            className="mr-5 flex-1 text-right font-medium text-sm"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            className="w-3/4 px-5 py-1 border rounded-lg"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button className="donate-button mx-auto" type="submit">
          Sign up
        </button>
        {error && <p className="text-center text-_red p-5 text-sm">{error}</p>}
      </form>
    </div>
  );
}
