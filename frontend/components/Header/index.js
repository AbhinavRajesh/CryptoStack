import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import { Web3Context } from "../../context/Web3Context";
import Logo from "../Logo";
import QuestionPopup from "../QuestionPopup";

const Header = () => {
  const [questionPopupVisible, setQuestionPopupVisible] = useState(false);
  const { address } = useContext(Web3Context);

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
              <Link href="/marketplace">
                <a>NFT Marketplace</a>
              </Link>
            </li>
            <li>
              <Link href="/questions">
                <a>Question</a>
              </Link>
            </li>
            <li onClick={() => setQuestionPopupVisible(true)}>
              Ask a Question
            </li>
            <li>
              <Link href="/profile">
                <a>
                  {address
                    ? `${address?.slice(0, 5)}...${address?.slice(-5)}`
                    : "Login"}
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <QuestionPopup
        visible={questionPopupVisible}
        setVisible={setQuestionPopupVisible}
      />
    </>
  );
};

export default Header;
