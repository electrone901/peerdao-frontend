import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const { ethers } = require("ethers");
import { DAO_CONTRACT_ABI } from "../../Frontend Logic/DAOContractABI";
import { TOKEN_CONTRACT_ABI } from "../../Frontend Logic/tokenContractABI";

type MetamaskMaskProviderValues = {
  address: string | null;
  daoContract: string | null;
  tokenContract: string | null;
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
  const [daoContract, setDaoContract] = React.useState<string | null>(null);
  const [tokenContract, setTokenContract] = React.useState<string | null>(null);
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
      if (chainId == "3141") {
        const DAOContractAddress = "0xdeaF0f54F0E9897F53e7bFdc222419F2cEC4F5d1";
        const tokenContractAddress =
          "0xb8F41783C0476e48Cf7DC468D1Fe67f57C3393E4";
        const signer = provider.getSigner();

        const DAOContract = new ethers.Contract(
          DAOContractAddress,
          DAO_CONTRACT_ABI,
          signer
        );

        const tokenContract = new ethers.Contract(
          tokenContractAddress,
          TOKEN_CONTRACT_ABI,
          signer
        );

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
