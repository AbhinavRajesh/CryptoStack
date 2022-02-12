import Head from "next/head";
import Link from "next/link";
import Logo from "../Logo";

const Header = () => {
  return (
    <>
      <Head>
        <title>CryptoStack</title>
        <meta name="description" content="CryptoStack" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <header className="flex items-center justify-between max-w-[1440px] mx-auto py-[10px] px-[32px] md:px-[64px] lg:px-[120px]">
        <h1 className="flex-1 flex items-center justify-start">
          <Link href="/">
            <a className="flex items-center">
              <Logo />
              <span className="pl-[15px] font-bold text-[20px]">
                CryptoStack
              </span>
            </a>
          </Link>
        </h1>
        <nav className="flex items-center flex-1">
          <ul className="flex items-center justify-between w-full">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/questions">
                <a>Question</a>
              </Link>
            </li>
            <li>
              <Link href="/ask">
                <a>Ask a Question</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Profile/Logout</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
