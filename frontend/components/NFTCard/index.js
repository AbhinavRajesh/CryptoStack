import Image from "next/image";

const NFTCard = ({ image, price, id }) => {
  const mint = () => {
    const formData = new FormData();
    formData.append("file", file);
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_NFTKEY}`,
      },
    };
    axios
      .post("https://api.nft.storage/upload", formData, options)
      .then((result) => {
        console.log(result.data.value.cid);
      });
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
      <button className="bg-blue-500 text-white px-[20px] py-[10px] rounded font-bold mt-[10px]">
        Mint
      </button>
    </div>
  );
};

export default NFTCard;
