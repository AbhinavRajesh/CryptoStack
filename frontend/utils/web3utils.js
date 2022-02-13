import CryptoStackMain from "../public/CryptoStackMain.json";

export const loadBlockchainData = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const csMainData = CryptoStackMain.networks[networkId];
  if (csMainData) {
    CryptoStack = new web3.eth.Contract(
      CryptoStackMain.abi,
      csMainData.address
    );
    console.log({ CryptoStack });
    return true;
  } else {
    window.alert("Unidentified network, please connect to Celo or Alfajores");
    return false;
  }
};
