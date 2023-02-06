import ProposalListItem from "@/components/ProposalListItem";
import {
  Alert,
  Box,
  Button,
  Input,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useWallet } from "@/context/MetamaskProvider";
import { useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";
import Head from "next/head";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { ContractAddress, LH_API_KEY } from "@/utils/constants";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import { useToast } from '@chakra-ui/react'

const CreateProposal = () => {
  const { address, daoContract, tokenContract } = useWallet();
  const [balance, setBalance] = useState(BigNumber.from(0));

  const [isUploading, setIsUploading] = useState(false);
  const [uploaded_cid, setUploaded_cid] = useState("");
  const [desc, setDesc] = useState("");
  const toast = useToast()

  async function createProposal() {
    if (!uploaded_cid.length) {
      alert("Please upload a file");
      return;
    }
    applyAccessControl();
    const txn = await daoContract?.createProposal(uploaded_cid, desc);


      toast({
        title: 'Proposal created.',
        description: "We've created the proposal.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    
  
    
    
  }

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
    let percentageDone = (
      progressData?.total / progressData?.uploaded
    )?.toFixed(2);
    console.log(percentageDone);
  };

  const deployEncrypted = async (e: string) => {
    console.log(e);
    setIsUploading(true);
    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      e,
      sig.publicKey,
      LH_API_KEY,
      sig.signedMessage,
      progressCallback
    );
    console.log("response", response);

    setUploaded_cid(response.data.Hash);
    setIsUploading(false)
  };

  const sign_auth_message = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicKey = (await signer.getAddress()).toLowerCase();
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return { publicKey: publicKey, signedMessage: signedMessage };
  };


  const applyAccessControl = async () => {
    try {
    
      const conditions = [
        {
          id: 1,
          contractAddress: ContractAddress.DAO,
          chain: "Hyperspace",
          method: "accessible",
          standardContractType: "Custom",
          parameters: ["0"],
          inputArrayType: ["uint256"],
          outputType: "bool",
          returnValueTest: {
            comparator: "==",
            value: "true",
          },
        },
      ];

      const aggregator = "([1])"; // 1 and 2 creates conditions

      const { publicKey, signedMessage } = await sign_auth_message();

      const response = await lighthouse.accessCondition(
        publicKey,
        uploaded_cid,
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
    <>
      <Head>
        <title>PeerDAO</title>
        <meta name="description" content="Data dao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        p={10}
        bg="#1E293B"
        display="flex"
        w={"100%"}
        justifyContent="center"
        h={"100%"}
        alignItems="center"
        justifyItems="center"
      >
        <Box p={4} bg="gray.50" minH={600} maxW={600} rounded="xl">
          <h1
            style={{
              fontWeight: 600,
              fontSize: "36px",
              lineHeight: "40px",
              color: "#334155",
              textAlign: "center",
            }}
          >
            Submit Proposal
          </h1>
          <h2
            style={{
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "40px",
              color: "#334155",
              textAlign: "center",
            }}
          >
            Submit your video proposals for review by the PeerDao team
          </h2>

          <FormControl mt={4} mb={4}>
            <FormLabel>Content Description</FormLabel>
            <Input
              type="text"
              accept="video/mp4,video/x-m4v,video/*"
              onChange={(e) => setDesc(e.target.value)}
            />
          </FormControl>

          <FormControl flex={1} >
            <FormLabel>Upload Video Content</FormLabel>
            <Input type="file" onChange={(e) => deployEncrypted(e as any)} />
          </FormControl>

          <Button
            bg="#818CF8"
            color="white"
            w="100%"
            mt={8}
            mr={3}
            isLoading={isUploading}
            onClick={() => {
              createProposal();
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateProposal;
