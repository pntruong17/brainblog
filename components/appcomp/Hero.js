import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { updateEmail } from "@/firebase/emailFirebase";
import { gamelib } from "@/libs/gamelib";

const Hero = ({ posts, trivia }) => {
  console.log(trivia);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleAddEmail = async () => {
    const newData = { name: "", age: "" };
    const result = await updateEmail(email, newData);
    console.log(result); // true hoặc false tùy vào kết quả thực thi của hàm
  };

  function handleSubmit(event) {
    event.preventDefault();

    // Kiểm tra tính hợp lệ của email
    if (!email || !isValidEmail(email)) {
      setIsEmailValid(false);
      return;
    }

    // Lưu email vào Firestore hoặc gửi email đến server
    handleAddEmail();
    console.log("Email:", email);

    // Reset giá trị của input
    setEmail("");
    setIsEmailValid(true);
  }

  function handleChange(event) {
    setEmail(event.target.value);
    setIsEmailValid(true);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  return (
    <>
      <div className="max-w-6xl mx-auto px-3">
        <div className="w-fu my-10">
          <h1 className="font-black text-[56px] sm:text-[78px] tracking-tighter leading-[68px]">
            Take the challenge and discover your IQ score
          </h1>

          <Link
            className="w-36 h-14 flex justify-center items-center border-4 border-_bg_dark dark:border-gray-100 font-black  mt-5"
            href={"/test-iq"}
          >
            TEST IQ
          </Link>
        </div>
        <div className="flex flex-wrap mt-16">
          <div className="w-full md:w-3/4 md:pr-10">
            <h3 className="w-full font-Inter font-bold text-lg tracking-tighter mb-3 border-b">
              Recent Posts
            </h3>
            <div
              href={"/articles/"}
              className="w-full h-[25rem] relative rounded-md"
            >
              <Image
                fill
                objectFit="cover"
                loading="lazy"
                className="rounded-md"
                src={posts[0].frontmatter.cover_image}
                alt={posts[0].frontmatter.title}
              />
              <div className="absolute -bottom-[120px] w-full">
                <div className="w-[90%] mx-auto bg-slate-100  p-6 rounded-md shadow">
                  <div className="flex mb-3">
                    <h3 className="text-gray-500 text-sm">
                      {posts[0].frontmatter.category}
                    </h3>
                    <h3 className="text-gray-500 text-sm ml-5">
                      {posts[0].frontmatter.date}
                    </h3>
                  </div>
                  <Link
                    href={"/articles/" + posts[0].slug}
                    className="text-2xl md:text-3xl text-gray-900 font-black hover:text-sky-600 hover:cursor-pointer"
                  >
                    {posts[0].frontmatter.title}
                  </Link>
                  <p className="text-base text-gray-800 mt-5">
                    {posts[0].frontmatter.excerpt}
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-5 mt-48 sm:mt-32">
              {posts &&
                posts
                  .filter((post, index) => index !== 0)
                  .map((post, index) => (
                    <div key={index} className="w-full h-auto md:min-h-[20rem]">
                      <div className="w-full h-full overflow-hidden rounded-md dark:bg-_darkblue bg-slate-100">
                        <div className=" w-full h- md:h-36 hover:cursor-pointer overflow-hidden flex justify-center items-center ">
                          <Image
                            width={450}
                            height={100}
                            loading="lazy"
                            className=""
                            src={post.frontmatter.cover_image}
                            alt="image blog"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="text-gray-500 text-sm">
                            {post.frontmatter.category}
                          </h3>
                          <Link
                            href={"/articles/" + post.slug}
                            className="text-[18px] md:text-[25px] font-black hover:text-sky-600 hover:cursor-pointer"
                          >
                            {post.frontmatter.title}
                          </Link>
                          <p className="text-[15px] mb-3">
                            {post.frontmatter.excerpt}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <h3 className="w-full font-Inter mt-10 font-bold text-lg tracking-tighter mb-3 border-b">
              Trivia
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-5">
              {trivia &&
                trivia.map((tri, index) => (
                  <Link
                    key={index}
                    href={"/trivia/" + tri.slug}
                    className="w-full min-h-[30rem] overflow-hidden relative rounded-md"
                  >
                    <Image
                      layout="fill"
                      objectFit="cover"
                      loading="lazy"
                      className="max-w-full min-h-full hover:cursor-pointer"
                      src={tri.image}
                      alt="blog image"
                    />
                    <div className="absolute bottom-5 w-full">
                      <div className="w-[90%] mx-auto bg-white/[0.68] text-_bg_dark p-6 rounded-md shadow">
                        <h2 className="text-2xl md:text-3xl font-black hover:text-_blue hover:cursor-pointer">
                          {tri.title}
                        </h2>
                        <p className="text-base mt-5">{tri.expert}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          <div className="w-full md:w-1/4 flex flex-col">
            <h3 className="w-full font-Inter font-bold text-lg tracking-tighter mb-3 border-b">
              Brain Games
            </h3>
            {gamelib.map((game, index) => (
              <Link
                key={index}
                href={"/brain-games/" + game.Slug}
                className="w-full h-auto md:min-h-[20rem] mb-5"
              >
                <div className="w-full h-full overflow-hidden rounded-md dark:bg-_darkblue bg-slate-100">
                  <div className=" w-full h- md:h-36 hover:cursor-pointer overflow-hidden flex justify-center items-center ">
                    <Image
                      width={100}
                      height={100}
                      loading="lazy"
                      className="hover:cursor-pointer"
                      src={game.PhotoURL}
                      alt="image blog"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-gray-500 text-sm">{game.Group} Game</h3>
                    <h2 className="text-[18px] md:text-[25px] font-black hover:text-sky-600 hover:cursor-pointer">
                      {game.Name}
                    </h2>
                    <p className="text-[15px] mb-3">{game.Desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-md bg-_accent_dark px-5 sm:px-40 py-20 my-10 flex flex-col">
          <h2 className="text-5xl font-black text-center text-_bg_dark">
            Get in touch
          </h2>
          <p className="text-center text-_bg_dark mt-3 ">
            We love biulding great user experiences and we are dedicated ti
            creating the app for budgeting
          </p>
          <div className=" mt-5">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row justify-center items-center"
            >
              <input
                placeholder="Enter your email"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="flex-grow bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-sky-600 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-5 mt-3 leading-8 transition-colors duration-200 ease-in-out"
              />

              <button
                type="submit"
                className="text-white w-32 mx-auto bg-black rounded-full border-0 py-3 px-5 focus:outline-none hover:bg-sky-600 sm:ml-5 text-lg mt-3"
              >
                Subscribe
              </button>
            </form>
          </div>
          {!isEmailValid && (
            <span className="w-full text-center text-_red mt-5">
              Email is not available, please collect later
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Hero;
