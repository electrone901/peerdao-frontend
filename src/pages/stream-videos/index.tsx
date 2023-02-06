import React, { useEffect, useState } from "react";
import {
  Text,
  Heading,
  Center,
  Flex,
  SimpleGrid,
  Box,
  Spinner,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import CardStreamVideo from "@/components/CardStreamVideo";

import { BigNumber, ethers, utils } from "ethers";
import { PeerDAO } from "@/typechain/PeerDAO";
import { useWallet } from "@/context/MetamaskProvider";
import lighthouse from "@lighthouse-web3/sdk";


const sign_auth_message = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const publicKey = (await signer.getAddress()).toLowerCase();
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return { publicKey: publicKey, signedMessage: signedMessage };
};


const StreamVideo = () => {


  const [showVideo, setShowVideo] = useState<PeerDAO.VideoStructOutput | null>(null);

  const { address, daoContract, tokenContract } = useWallet();

  const [videos, setVideos] = useState<PeerDAO.VideoStructOutput[]>([]);

  const [fileURL, setFileURL] = useState("");

  async function getProposals() {
    console.log("getProposals:", daoContract);
    try {
      const ps = await daoContract?.getAllVideos();
      console.log("proposals", ps);
      setVideos(ps || []);
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

  async function obtainAccess(videoId: number) {
    // calling the smart contract to grant access
    const txn = await daoContract?.getAccess(videoId, {
      value: ethers.utils.parseUnits("0.1", "ether"),
      gasLimit: 10000000
    });
    await txn?.wait();
  }


  const decrypt = async (cid: string) => {
    
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


  function videoSection() {
    return fileURL.length == 0 ? (
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
          color="green.500"
          size="xl"
        />
      </Box>
    ) : (
      <video controls width="100%" src={fileURL} />
    );
  }

  function handleOnClickVideo(vid: PeerDAO.VideoStructOutput) {

    setShowVideo(vid)
    obtainAccess(vid.id.toNumber()).then((res) => {
     decrypt(vid.contentHash) 
    })
  }

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
        {showVideo && (
          videoSection()
        )}
        <SimpleGrid
          p={10}
          spacing={6}
          templateColumns="repeat(auto-fill, minmax(400px, 1fr))"
        >
          {videos ? (
            videos.map((video, idx) => (
              <CardStreamVideo video={video} key={idx} onClicked={(v) => {handleOnClickVideo(v)}} />
            ))
          ) : (
            <h2>No videos Yet...</h2>
          )}
        </SimpleGrid>
      </section>
    </div>
  );
};

export default StreamVideo;
