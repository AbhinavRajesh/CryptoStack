import { useEffect, useState } from "react";

const Loading = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const loop = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ".";
        else return prev + ".";
      });
    }, 500);

    return () => clearInterval(loop);
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">
        Checking Authentication status{dots}
      </h1>
    </div>
  );
};

export default Loading;
