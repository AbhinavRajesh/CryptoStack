import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import NFTCard from "../components/NFTCard";
import { Web3Context } from "../context/Web3Context";

const NFT1 = "https://ipfs.io/ipfs/bafybeia4ti47nq5aifjy4wh6kule3z7tmj6ugwls7z3pdzl4zlsjqki2pe";
const NFT2 = "https://ipfs.io/ipfs/bafybeibvzodfpehwokqst5f3r6s7e4gelflg6onqre2dwyls2xx3752eum";
const NFT3 = "https://ipfs.io/ipfs/bafybeibpmm7fhud5xrkwa2dlifkfgqvokhautqxlljbz5vgdrlxi56px5e";
const NFT4 = "https://ipfs.io/ipfs/bafkreidnaqmxcce5dvs3dt5py2zh4jattnuehn72gkk5a5ldbveq27fct4";
const NFT5 = "https://ipfs.io/ipfs/bafkreiajqnxw5hjrv3je55bqrwvabe744b4xqx6sgxe4w2cmvmcg6ijfki";
const NFT6 = "https://ipfs.io/ipfs/bafkreifgfvy2uhx3dknvu6rquijabqqy4fwfbgp5py4pp6erzxo6iwy4bq";
const NFT7 = "https://ipfs.io/ipfs/bafkreifglinbybw4monitik2f6xtiakhioefsew33yvfa2c5t3kgdyruhi";
const NFT8 = "https://ipfs.io/ipfs/bafybeig2avkvz3it7e6mubk6mi722ehbkd4mbyl7bhvg4p5cs2l7egxoji";
const NFT9 = "https://ipfs.io/ipfs/bafybeifs4xllc3nlnqv6o55uaph5sfxfitv3plflsrz2bk4ongsingj5qi";

const MarketPlace = () => {
  const [price, setPrice] = useState(0.1);
  const { CryptoStack, isFrequentContributor } = useContext(Web3Context);

  useEffect(() => {
    if (CryptoStack) getPrice();
  }, [CryptoStack]);

  const getPrice = async () => {
    const response = await isFrequentContributor();
    if (response) setPrice(0.05);
  };

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
