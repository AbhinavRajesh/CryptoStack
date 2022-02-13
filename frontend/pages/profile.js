import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import Header from "../components/Header";
import NFTCard from "../components/NFTCard";

const Profile = () => {
  const { userData, setUserData, getUserInfo, getMyNFTS } =
    useContext(Web3Context);
  const [NFTS, setNFTS] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await getUserInfo();
    const NFTS = await getMyNFTS();
    setUserData(user);
    setNFTS(NFTS);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] pt-[54px]">
        <h1 className="text-[36px] font-bold">Profile Page</h1>
        <div className="flex flex-col items-start mt-[20px]">
          <div className="grid grid-cols-2 max-w-[600px] items-center">
            <p className="font-bold text-lg">Username:</p>
            <span>{userData?.userName}</span>
            <p className="font-bold text-lg">Wallet Address: </p>
            <span className="font-normal mt-[15px]">
              {userData?.userAddress}
            </span>
            <p className="font-bold text-lg">User Points: </p>
            <span className="font-normal mt-[15px]">
              {userData?.userPoints}
            </span>
          </div>
        </div>
        <h2 className="my-[30px] font-bold text-[24px]">Owned NFTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {NFTS?.map(({ image, description, name, tokenID }) => (
            <NFTCard
              image={image}
              key={tokenID}
              name={name}
              description={description}
              showButton={false}
              tokenID={tokenID}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Profile;
