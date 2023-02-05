import { PeerDAO, PeerToken } from "@/typechain";
import { ContractAddress } from "@/utils/constants";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const { ethers } = require("ethers");
import { PeerDAO__factory } from "../typechain/factories/PeerDAO__factory";
import { PeerToken__factory } from "../typechain/factories/PeerToken__factory";

type MetamaskMaskProviderValues = {
  address: string | null;
  daoContract: PeerDAO | null;
  tokenContract: PeerToken | null;
  setAddress: () => void;
  disconnect: () => void;
};

const MetamaskContext = React.createContext<MetamaskMaskProviderValues | null>(
  null
);

export const useWallet = () => {
  const context = React.useContext(MetamaskContext);

  if (!context) {
    throw new Error("useWallet must be used within a MetamaskProvider");
  }
  return context;
};

export const MetamaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [address, setAddress] = React.useState<string | null>(null);
  const [daoContract, setDaoContract] = React.useState<PeerDAO | null>(null);
  const [tokenContract, setTokenContract] = React.useState<PeerToken | null>(null);
  console.log({ daoContract });
  console.log({ tokenContract });

  React.useEffect(() => {
    if (
      typeof window.ethereum !== "undefined" &&
      window.ethereum &&
      window.ethereum.selectedAddress
    ) {
      setAddress(window.ethereum.selectedAddress);
      handleSetContracts();
    }
  }, []);

  /**
   * - redirect to dashboard on connected
   * - redirect to home on unconnected
   * */
  const redirectOnAction = React.useCallback(() => {
    if (!address) {
      if (router.pathname.startsWith("/dashboard")) {
        router.push("/");
        return;
      }
    }

    if (address) {
      if (router.pathname === "/") {
        router.push("/dashboard");
        return;
      }
    }
  }, [address, router]);

  // React.useEffect(() => {
  //   redirectOnAction();
  // }, [redirectOnAction]);

  React.useEffect(() => {
    if (typeof window.ethereum !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        const changedAddress = accounts[0] ?? null;
        if (!changedAddress) {
          setAddress(null);
          return;
        }
        setAddress(changedAddress);
      });
    }
  }, [router]);

  const handleSetAddress = async () => {
    if (window.ethereum) {
      handleSetContracts();
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: string[]) => {
          setAddress(result[0]);
        });
    }
  };

  const handleSetContracts = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      console.log('chainId', chainId);
      if (chainId == "3141") {
        const DAOContractAddress = ContractAddress.DAO;
        const tokenContractAddress = ContractAddress.TOKEN;
        const signer = provider.getSigner();

        const DAOContract = PeerDAO__factory.connect(DAOContractAddress, signer);
        const tokenContract= PeerToken__factory.connect(tokenContractAddress, signer);
        
        setDaoContract(DAOContract);
        setTokenContract(tokenContract);
      }
    }
  };

  const handleDisconnect = () => {
    setAddress(null);
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        address,
        daoContract,
        tokenContract,
        setAddress: handleSetAddress,
        disconnect: handleDisconnect,
      }}
    >
      {loaded ? children : null}
    </MetamaskContext.Provider>
  );
};
