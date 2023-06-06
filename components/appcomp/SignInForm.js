import { useState } from "react";
import { useRouter } from "next/router";
import { useUserAuth } from "./helper/UserAuthContextProvider";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const { logIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      router.push("/");
    } catch (er) {
      console.log(er);
      setError(
        "Incorrect password. If you forgot your password click here to create a new password"
      );
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
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
            required
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
            required
          />
        </div>
        <button className="donate-button mx-auto" type="submit">
          Sign In
        </button>
        {error && (
          <p className="text-center text-_red m-5 text-sm cursor-pointer hover:underline">
            <Link href={"/forget-password"}>{error}</Link>
          </p>
        )}
      </form>
    </div>
  );
}
