import Image from "next/image";
import { useContext } from "react";
import { create } from "ipfs-http-client";
import { Web3Context } from "../../context/Web3Context";

const client = create("https://ipfs.infura.io:5001/api/v0");

const NFTCard = ({
  image,
  price,
  id,
  description,
  name,
  tokenID,
  showButton = true,
}) => {
  const { purchaseNFT } = useContext(Web3Context);

  const mint = async () => {
    const formData = new FormData();
    const metadata = {
      name: "CryptoStack Reward NFT " + id.toString(),
      description: "Exclusive CryptoStack NFT collection",
      image: image,
    };

    formData.append("metadata", metadata);

    const metadataString = JSON.stringify(metadata);
    try {
      const added = await client.add(metadataString);
      const uri = `https://ipfs.infura.io/ipfs/${added.path}`;
      purchaseNFT(uri);
    } catch (error) {
      console.log("Error uploading file: ", error);
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
          className="rounded"
        />
      </div>
      {price && (
        <h3 className="mt-[10px]">
          Price: <span className="font-bold">{price} CELO</span>
        </h3>
      )}
      {tokenID && (
        <h3 className="mt-[10px]">
          Token ID: <span className="">{tokenID}</span>
        </h3>
      )}
      {name && (
        <h3 className="mt-[10px]">
          <span className="font-bold">{name}</span>
        </h3>
      )}
      {description && (
        <p className="mt-[10px]">
          <span className="text-gray-600 font-medium">{description}</span>
        </p>
      )}
      {showButton && (
        <button
          className="bg-blue-500 text-white px-[20px] py-[10px] rounded font-bold mt-[10px]"
          onClick={mint}
        >
          Mint NFT
        </button>
      )}
    </div>
  );
};

export default NFTCard;
