import React from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

function UploadEncryptedFiles({ setCid }) {
  const API_KEY = "5f1536db-bc5f-44b0-8e3c-5a2972e88ed4";

  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  const progressCallback = (progressData: {
    total: number;
    uploaded: number;
  }) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deployEncrypted = async (
    e: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      e,
      sig.publicKey,
      API_KEY,
      sig.signedMessage,
      progressCallback
    );
    console.log("response", response);
    if (response?.data) {
      setCid(response.data.Hash);
    }
  };

  return (
    <div>
      <input onChange={(e) => deployEncrypted(e)} type="file" />
    </div>
  );
}

export default UploadEncryptedFiles;
