import { useRouter } from "next/router";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import { useEffect, useState } from "react";
import { PeerDAO } from "@/typechain";
import { useWallet } from "@/context/MetamaskProvider";
import { Box, Button, Link, Image, Spinner } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'


const sign_auth_message = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const publicKey = (await signer.getAddress()).toLowerCase();
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return { publicKey: publicKey, signedMessage: signedMessage };
};

const ProposalDetail = () => {
  const router = useRouter();
  const { pid } = router.query;
  const { address, daoContract, tokenContract } = useWallet();
  const [fileURL, setFileURL] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [proposal, setProposal] = useState<PeerDAO.ProposalStructOutput | null>(
    null
  );
  const toast = useToast()

  async function getProposals() {
    const ps = await daoContract?.getAllProposals();
    console.log("proposals", ps, daoContract);

    const po = ps?.find((p) => p.id.toNumber() === parseInt(pid as string));
    
    setProposal(po || null);
  }

  async function getProposalStatus() {
    const pstatus = await daoContract?.getState(pid as string);
    console.log("pstatus", pstatus, daoContract);
    setStatus(pstatus|| null);
  }

  useEffect(() => {
    getProposals();
    getProposalStatus()
  }, [address, daoContract, tokenContract]);

  useEffect(() => {
    if (proposal) {
      decrypt();
    } else {
      console.log("no proposal");
    }
  }, [proposal]);

  // useEffect(() => {
  //   decrypt()
  // },[])

  const decrypt = async () => {
    // Fetch file encryption key
    const cid = proposal?.contentHash || ""; //replace with your IPFS CID
    const { publicKey, signedMessage } = await sign_auth_message();
    console.log(signedMessage);

    const keyObject = await lighthouse.fetchEncryptionKey(
      cid,
      publicKey,
      signedMessage
    );

    const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key);
    console.log("decrypted", decrypted);
    /*
      Response: blob
    */

    // View File
    const url = URL.createObjectURL(decrypted);
    console.log("url", url);
    setFileURL(url);
  };

  const vote = async () => {
    if (proposal) {

      console.log("proposal.id", proposal.id.toNumber())
      const result = await daoContract?.voteContribution(proposal.id.toNumber(), {
        gasLimit: 10000000,
      });
      
      console.log("result", result);
      

      toast({
        title: 'Proposal Voted',
        description: "Txn: " + result?.hash,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    
  

    }
  };

  return (
    <div className="">
      {fileURL.length == 0 ? (
        <Box
          justifyContent="center"
          display="flex"
          bg="black"
          flexDirection="column"
          alignItems="center"
          width="100%"
          height="600px"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <video controls width="100%" src={fileURL} />
      )}

      <Box bg="#1E293B" color="white" p={4}>
        <h1 color="white">#{pid}</h1>
        <h2 color="white">Proposer: {proposal?.proposer}</h2>

        <h2 color="white">Description: {proposal?.description}</h2>
        <h2 color="white">Status: {status}</h2>

        <Link href={fileURL}>Download </Link>

        <Box p="2" rounded="md" bg="#1E293B" display="flex" mt="1">
          <Box p="2" rounded="md" flex={1} textAlign="left">
            <p>Vote: {proposal?.forVotes.toNumber()} </p>
          </Box>

          <Box p="0" rounded="md" bg="#1E293B">
            <Button
              variant="ghost"
              onClick={() => {
                vote();
              }}
            >
              <Image src="/upvote.png" rounded="md" />
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ProposalDetail;
