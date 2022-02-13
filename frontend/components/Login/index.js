import { useState } from "react";

const Login = ({ visible, setVisible }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ username });
  };

  if (!visible) return null;

  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full bg-[#00000052]"></div>
      <div className="flex flex-col pb-[35px] px-[25px] pt-[14px] md:pb-[70px] md:px-[50px] md:pt-[30px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-w-[400px] w-full rounded-[10px]">
        <div className="w-full flex justify-end items-center">
          <span
            className="text-[32px] cursor-pointer"
            onClick={() => setVisible(false)}
          >
            &times;
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-full flex flex-col items-start justify-center"
        >
          <label htmlFor="username" className="text-lg font-semibold">
            Enter username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-100 px-[20px] py-[10px] mt-[15px] w-full outline-none"
            placeholder="Enter a username"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold text-base px-[20px] py-[10px] rounded w-full mt-[15px]"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
