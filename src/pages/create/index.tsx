import ProposalListItem from "@/components/ProposalListItem";
import {
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

const JoinDao = () => {
  const { address, daoContract, tokenContract } = useWallet();
  const [balance, setBalance] = useState(BigNumber.from(0));

  async function createProposal() {
    const txn = await daoContract?.createProposal("", "");
  }

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
            <Input type="text" />
          </FormControl>

          <FormControl flex={1}>
            <FormLabel>Upload Video Content</FormLabel>
            <Input type="file" />
          </FormControl>

          <Button
            bg="#818CF8"
            color="white"
            w="100%"
            mr={3}
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

export default JoinDao;
