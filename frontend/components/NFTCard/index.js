import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { create } from 'ipfs-http-client';
import { Web3Context } from "../../context/Web3Context";

const client = create('https://ipfs.infura.io:5001/api/v0');

const NFTCard = ({ image, price, id }) => {
  const { purchaseNFT } = useContext(Web3Context);

  const mint = async () => {
    const formData = new FormData();
    const metadata = {
      name: "CryptoStake Reward NFT "+id.toString(),
      description: "Exclusive CryptoStake NFT collection",
      image: image
    }
    
    formData.append("metadata", metadata);
    
    const metadataString = JSON.stringify(metadata);
    try {
        const added = await client.add(metadataString);
        const uri = `https://ipfs.infura.io/ipfs/${added.path}`;
        purchaseNFT(uri);
    } catch (error) {
        console.log('Error uploading file: ', error);
    }
  };

  return (
    <div className="flex flex-col relative shadow p-[20px]">
      <div className="relative h-[300px]">
        <Image
          src={image}
          layout="fill"
          objectPosition="center"
          objectFit="cover"
        />
      </div>
      <h3 className="mt-[10px]">
        Price: <span className="font-bold">{price} CELO</span>
      </h3>
      <button className="bg-blue-500 text-white px-[20px] py-[10px] rounded font-bold mt-[10px]"
        onClick = {mint}
      >
        Mint NFT
      </button>
    </div>
  );
};

export default NFTCard;
