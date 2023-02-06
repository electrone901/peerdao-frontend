import { useState } from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

function AccessControll({ cid }: {cid: string}) {
  console.log("🚀 ~ file: AccessControll.tsx:6 ~ AccessControll ~ cid", cid);

  const sign_auth_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return { publicKey: publicKey, signedMessage: signedMessage };
  };

  const accessControl = async () => {
    try {
      //  encrypted downloads a binary
      //  https://gateway.lighthouse.storage/ipfs/QmTZZjPwX8HqfxoEXn5h7sN3agNNt8q1mVYdcJAWoCBF2h
      // const cid = "QmZMPzQrEBNFepsXsrMYi3uk9QHXLP1xa4U9nJHLaD94BT";

      const cid = "QmReixDu3km1Q9Qc84N5tn5dc8XkQ6bJqcin9esni3gZQW";

      // const publicKey = "0xa3c960b3ba29367ecbcaf1430452c6cd7516f588";
      // const privateKey =
      //   "0x6aa0ee41fa9cf65f90c06e5db8fa2834399b59b37974b21f2e405955630d472a";

      // Conditions to add
      // id: 1 is agregator
      // parameters are optional
      // parameters: [0x44b269491f4ed800621433cd79bcf62319593c9e],
      // :userAddress is added by the BE
      //  fileOwner will always have access

      const conditions = [
        {
          id: 1,
          contractAddress: "0xED8A53399ff554fCA91b58c2720886135A1821c1",
          chain: "Mumbai",
          method: "balanceOf",
          standardContractType: "ERC20",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: ">=",
            value: "1",
          },
        },
      ];

      const aggregator = "([1])"; // 1 and 2 creates conditions

      const { publicKey, signedMessage } = await sign_auth_message();

      const response = await lighthouse.accessCondition(
        publicKey,
        cid,
        signedMessage,
        conditions,
        aggregator
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={() => accessControl()}>Click AccessControl</button>
    </div>
  );
}

export default AccessControll;
