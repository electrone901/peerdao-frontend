import ProposalListItem from "@/components/ProposalListItem";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useWallet } from "@/context/MetamaskProvider";
import { useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";
import Head from "next/head";
import {PeerDAO} from "@/typechain/PeerDAO";


const ProposalListing = () => {
  const { address, daoContract, tokenContract } = useWallet();

  const [proposals, setProposals] = useState<PeerDAO.ProposalStructOutput[]>([]);

  async function getProposals() {
    console.log('getProposals:', daoContract);
    try {
      const ps = await daoContract?.getAllProposals();
      console.log('proposals', ps);
      setProposals(ps || [])
      
    } catch (error) {
      console.warn(error);
    }
  }


  useEffect(() => {
    if (daoContract) {
      console.log("daoContract fetching...");
      getProposals();
    } else {
      console.log("daoContract not found");
    }
  }, [address, daoContract, tokenContract]);


  return (
    <>
      <Head>
        <title>PeerDAO</title>
        <meta name="description" content="Data dao" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box p={4} bg="gray.50">
        <h1
          style={{
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "40px",
            color: "#334155",
            textAlign: "center",
          }}
        >
          Proposal Review 
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
          Cast your votes for your favorite videos
        </h2>

        <p>
        Number of proposals: {proposals.length}
        </p>

        <SimpleGrid
          columns={{ sm: 2, md: 4 }}
          spacing="8"
          p="10"
          textAlign="center"
          rounded="lg"
          color="gray.400"
        >
          {proposals.map((p, index) => ( <ProposalListItem p={p} key={index} /> ))}

        </SimpleGrid>
      </Box>
    </>
  );
};

export default ProposalListing;
