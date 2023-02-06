import { useState } from "react";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

function DecryptFile(props: any) {
  const [fileURL, setFileURL] = useState(null);

  const sign_auth_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return { publicKey: publicKey, signedMessage: signedMessage };
  };

  const decrypt = async () => {
    // const cid = "Qmb21PD2oFLUXbKieKmJGUWLz9ZPYeW3UsgzCfnKUVpkv2";
    const cid = "QmReixDu3km1Q9Qc84N5tn5dc8XkQ6bJqcin9esni3gZQW";
    const { publicKey, signedMessage } = await sign_auth_message();
    console.log("signedMess", signedMessage);

    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    const fileType = "json";
    const decrypted = await lighthouse.decryptFile(
      cid,
      keyObject.data.key
    );
    console.log(decrypted);
    const url = URL.createObjectURL(decrypted);
    console.log("url", url);

    const res = await fetch(url);
    const data = await res.json();
    console.log("🚀 ~ file: get.tsx:44 ~ decrypt ~ data", data);
    setFileURL(url as any);
  };

  return (
    <div>
      <button onClick={() => decrypt()}>Descrypt</button>

      {fileURL ? (
        <a href={fileURL} target="_blank" rel="noreferrer">
          View File
        </a>
      ) : null}
    </div>
  );
}

export default DecryptFile;
