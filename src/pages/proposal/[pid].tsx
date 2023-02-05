import { useRouter } from "next/router";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import { useEffect, useState } from "react";
import { PeerDAO } from "@/typechain";
import { useWallet } from "@/context/MetamaskProvider";
import { Box } from "@chakra-ui/react";






const sign_auth_message = async() =>{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const publicKey = (await signer.getAddress()).toLowerCase();
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(
    messageRequested
  );
  return({publicKey: publicKey, signedMessage: signedMessage});
}


const ProposalDetail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { address, daoContract, tokenContract } = useWallet();
  const [fileURL, setFileURL] = useState("");
  const [proposal, setProposal] = useState<PeerDAO.ProposalStructOutput | null>(null);

  async function getProposals() {
    const ps = await daoContract?.getAllProposals();
    console.log('proposals', ps);

    const po = ps?.find(p => p.id.toNumber() === parseInt(pid as string)) 
    setProposal(po || null)
  }


  useEffect(() => {
    getProposals();
    
  }, [address]);


  useEffect(() => {
    if (proposal) {
      decrypt()
    }
  }, [proposal])


  // useEffect(() => {
  //   decrypt()
  // },[])
  
  const decrypt = async () => {
    // Fetch file encryption key
    const cid = proposal?.contentHash || ""; //replace with your IPFS CID
    const { publicKey, signedMessage } = await sign_auth_message();
    console.log(signedMessage);
    /*
      fetchEncryptionKey(cid, publicKey, signedMessage)
        Parameters:
          CID: CID of the file to decrypt
          publicKey: public key of the user who has access to file or owner
          signedMessage: message signed by the owner of publicKey
    */
    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    // Decrypt file
    /*
      decryptFile(cid, key, mimeType)
        Parameters:
          CID: CID of the file to decrypt
          key: the key to decrypt the file
          mimeType: default null, mime type of file
    */

    const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key);
    console.log(decrypted);
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log('url', url);
    setFileURL(url);
  };

  return (
    <div className="">
     
      <video controls name="media" width="100%">
        <source src={fileURL || ""} type="video/webm" />
      </video>

      <Box bg="#1E293B" color="white" p={4}>

      <h1 color="white">#{pid}</h1>
      <h2 color="white">
        Proposer: {proposal?.proposer}
      </h2>
      <h2 color="white">
        Description {proposal?.description}
      </h2>

      </Box>
    </div>
  );
};

export default ProposalDetail;
