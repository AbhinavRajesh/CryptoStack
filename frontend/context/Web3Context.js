import { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { loadBlockchainData } from "../utils/web3utils";

export const Web3Context = createContext({
  web3: null,
  setWeb3: () => {},
  address: null,
  setAddress: () => {},
  logout: () => {},
});

const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    console.log(web3);
    if (web3) loadBlockchainData(web3);
  }, [web3]);

  useEffect(() => {
    setWeb3(new Web3(window.ethereum));
  }, []);

  const logout = () => {
    setAddress(null);
  };

  return (
    <Web3Context.Provider
      value={{ web3, setWeb3, address, setAddress, logout }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
