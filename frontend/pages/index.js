import { useContext, useState } from "react";
import Web3 from "web3";

import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Login from "../components/Login";
import Logo from "../components/Logo";
import { Web3Context } from "../context/Web3Context";

const Home = () => {
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const { address, setAddress, setWeb3 } = useContext(Web3Context);

  const tryConnectWallet = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      setWeb3(window.web3);
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts?.[0]);
        //here need to store variables - address=accounts[0] and web3=window.web3
      } catch (error) {
        // User denied account access...
      }
    } else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      setWeb3(window.web3);
      const accounts = await web3.eth.getAccounts();
      setAddress(accounts?.[0]);
      //here need to store variables - address=accounts[0] and web3=window.web3
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
            magnam molestiae, blanditiis consequuntur unde alias rem tem
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
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
          </div>
        </section>
      </main>
      <Login visible={loginPopupVisible} setVisible={setLoginPopupVisible} />
      <Footer />
    </>
  );
};

export default Home;
