import Header from "../components/Header";

const NFT = () => {
  return (
    <>
      <Header />
      <main className="max-w-[1440px] mx-auto px-[32px] md:px-[64px] lg:px-[120px] pt-[54px]">
        <h2 className="text-[24px] font-bold text-gray-700 mt-[20px]">
          User Rewards
        </h2>
        <ul className="list-disc list-inside">
          <li>
            For posting answers to questions the user can recieve 10 points
            each.
          </li>
          <li>
            These points accumulate and enables the user to purchase CryptoStack
            NFTS at a discount rate
          </li>
          <li>
            If the answer posted by the user is accepted by the questionnaire,
            they would be eligble to recieve a token reward of 0.01 CELO
          </li>
        </ul>
        <h2 className="text-[24px] font-bold text-gray-700 mt-[20px]">
          NFT Marketplace
        </h2>
        <ul className="list-disc list-inside">
          <li>
            Regular users would have to pay 0.1 CELO while minting while the
            frequent users can mint NFTS at 0.05 CELO
          </li>
          <li>
            The proceeds from NFT sales are used to generate revenue to sustain
            the platform
          </li>
        </ul>
      </main>
    </>
  );
};

export default NFT;
