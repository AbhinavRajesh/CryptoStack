import { useContext, useEffect, useState } from "react";

import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Login from "../components/Login";
import Logo from "../components/Logo";
import { Web3Context } from "../context/Web3Context";

const features = [
  {
    title: "Decentralized",
    description:
      "The platform is completely decentralized, without any centralized control or ownership",
  },
  {
    title: "Incentives",
    description:
      "Users receive CELO token rewards for providing reliable answers, moreover they earn points and can receive discounts in our NFT Marketplace",
  },
  {
    title: "Reliable",
    description:
      "Content ownership completely resides with the user and incentives enable the generation of more reliable content",
  },
  {
    title: "Privacy-preserving",
    description:
      "We do not collect any kind of user data, complete anonymity of users is guaranteed",
  },
];

const Home = () => {
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const { address, tryConnectWallet, getUserInfo, CryptoStack } =
    useContext(Web3Context);

  useEffect(() => {
    if (CryptoStack && address) checkAuth();
  }, [CryptoStack, address]);

  const checkAuth = async () => {
    const user = await getUserInfo();
    if (user === null) {
      setLoginPopupVisible(true);
    }
  };

  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] pt-[54px]">
        <section
          id="landing"
          className="flex flex-col items-center justify-center min-h-[70vh]"
        >
          <Logo scale={4} />
          <h1 className="text-[64px] font-bold mt-[20px]">CryptoStack</h1>
          <p className="text-center text-gray-600 max-w-[600px] mx-auto">
            Decentralized Q&A Platform and NFT Marketplace
          </p>
          <button
            onClick={tryConnectWallet}
            className="mt-[20px] py-[10px] px-[20px] bg-blue-500 text-white font-bold rounded hover:bg-blue-400 transition-all duration-300 ease-in-out"
          >
            {address ? "Logout" : "Connect your wallet now"}
          </button>
        </section>
        <section id="how-it-works">
          <h2 className="font-bold text-[36px]">How it works?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-[20px]">
            {features.map(({ title, description }, i) => (
              <FeatureCard title={title} description={description} key={i} />
            ))}
          </div>
        </section>
      </main>
      <Login visible={loginPopupVisible} setVisible={setLoginPopupVisible} />
      <Footer />
    </>
  );
};

export default Home;
