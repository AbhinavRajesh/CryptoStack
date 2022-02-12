import Image from "next/image";

const Footer = () => {
  return (
    <footer className="max-w-[1440px] mx-auto flex items-center justify-center p-[100px]">
      <div className="flex items-center justify-center">
        Powered by{" "}
        <span className="ml-[20px]">
          <Image src="/logo.svg" alt="CryptoStack" width={51} height={59} />
        </span>
      </div>
    </footer>
  );
};

export default Footer;
