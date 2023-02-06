import { PeerDAO } from "@/typechain";
import { Box, Button, Image, Link } from "@chakra-ui/react";

import React, { useEffect } from "react";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';



const ProposalListItem = ({ p }: { p: PeerDAO.ProposalStructOutput }) => {
  const [fileURL, setFileURL] = React.useState(null);



  return (
    <Box boxShadow="md" p="4" rounded="md" bg="white">

      <Link href={"/proposal/" + p.id}>
      <Image src="video-loading.png" alt="thumbnail" rounded="md" w={"100vh"} mb={1} />

      
      {/* <video controls autoplay name="media">
        <source
          src={"https://gateway.lighthouse.storage/ipfs/" + p.contentHash}
          type="video/webm"
        />
      </video> */}
{/* 
      {p.contentHash} */}
      <h1 style={{
        overflow: "hidden",
        textAlign: "left",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }}>Proposer: {p.proposer} </h1>
      <h2>{p.id.toNumber()}: {p.description}</h2>
      <Box p="2" rounded="md" bg="#1E293B" display="flex" mt="1">
        <Box p="2" rounded="md" flex={1} textAlign="left">
          <p>Vote: {p.forVotes.toNumber()} </p>
        </Box>

        
      </Box>
      </Link>
    </Box>
  );
};

export default ProposalListItem;
