import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import NFTCard from "../components/NFTCard";
import { Web3Context } from "../context/Web3Context";

import NFT1 from "../public/nfts/1.png";
import NFT2 from "../public/nfts/2.png";
import NFT3 from "../public/nfts/3.png";
import NFT4 from "../public/nfts/4.png";
import NFT5 from "../public/nfts/5.png";
import NFT6 from "../public/nfts/6.png";
import NFT7 from "../public/nfts/7.png";
import NFT8 from "../public/nfts/8.png";
import NFT9 from "../public/nfts/9.png";

const MarketPlace = () => {
  const [price, setPrice] = useState(0.1);
  const { isFrequentContributor } = useContext(Web3Context);

  useEffect(() => {
    getPrice();
  }, []);

  const getPrice = async () => {
    const response = await isFrequentContributor();
    if (response) setPrice(0.05);
  };

  console.log(NFT1);

  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] pt-[54px]">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          <NFTCard id={1} image={NFT1} price={price} />
          <NFTCard id={2} image={NFT2} price={price} />
          <NFTCard id={3} image={NFT3} price={price} />
          <NFTCard id={4} image={NFT4} price={price} />
          <NFTCard id={5} image={NFT5} price={price} />
          <NFTCard id={6} image={NFT6} price={price} />
          <NFTCard id={7} image={NFT7} price={price} />
          <NFTCard id={8} image={NFT8} price={price} />
          <NFTCard id={9} image={NFT9} price={price} />
        </section>
      </main>
    </>
  );
};

export default MarketPlace;
