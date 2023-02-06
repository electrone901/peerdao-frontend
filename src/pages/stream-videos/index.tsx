import React, { useEffect, useState } from "react";
import { Text, Heading, Center, Flex, SimpleGrid } from "@chakra-ui/react";
import ReactPlayer from 'react-player'
import CardStreamVideo from "@/components/CardStreamVideo";

import { BigNumber, utils } from "ethers";
import {PeerDAO} from "@/typechain/PeerDAO";
import { useWallet } from "@/context/MetamaskProvider";



const StreamVideo = () => {
  const [showVideo, setShowVideo] = useState(false);

  const { address, daoContract, tokenContract } = useWallet();

  const [videos, setVideos] = useState<PeerDAO.VideoStructOutput[]>([]);

  async function getProposals() {
    console.log('getProposals:', daoContract);
    try {
      const ps = await daoContract?.getAllVideos();
      console.log('proposals', ps);
      setVideos(ps || [])
      
    } catch (error) {
      console.warn(error);
    }
  }


  useEffect(() => {
    if (daoContract) {
      getProposals();
    } else {
      console.log("daoContract not found");
    }
  }, [address, daoContract, tokenContract]);



  return (
    <div className="streamvideo">
      <section className="popular_videos">
        <Heading
          fontSize="4xl"
          textAlign="center"
          style={{ fontWeight: "500", lineHeight: "32px" }}
          pt={10}
        >
          Available Videos
        </Heading>
        <Text
          fontSize="lg"
          textAlign="center"
          style={{ lineHeight: "32px" }}
          pt={2}
          color="gray.500"
        >
          Stream available videos on PeerDao
        </Text>
        {showVideo && <ReactPlayer
          url='https://www.youtube.com/watch?v=yubzJw0uiE4'
          width="100%"
          height="500px" />}
        <SimpleGrid
          p={10}
          spacing={6}
          templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
        >
          {videos ? (
            videos.map((video, idx) => <CardStreamVideo video={video} key={idx} setShowVideo={setShowVideo} />)
          ) : (
            <h2>No videos Yet...</h2>
          )}
        </SimpleGrid>
      </section>
    </div>
  );
};

export default StreamVideo;
