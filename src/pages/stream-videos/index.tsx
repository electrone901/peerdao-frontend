import React, { useState } from "react";
import { Text, Heading, Center, Flex, SimpleGrid } from "@chakra-ui/react";
import ReactPlayer from 'react-player'
import CardStreamVideo from "@/components/CardStreamVideo";

const data = [
  {
    image: "/p1.png",
    avatar: "ysong.png",
    wallet: "3j98t1W97Xl0...",
    floor: "0.14 PED",
    volume: "1,054 PED",
  },
  {
    image: "/ysong.png",
    avatar: "ysong.png",
    wallet: "3j98t1W97Xl0...",
    floor: "0.14 PED",
    volume: "1,054 PED",
  },
  {
    image: "/p1.png",
    avatar: "ysong.png",
    wallet: "3j98t1W97Xl0...",
    floor: "0.14 PED",
    volume: "1,054 PED",
  },
  {
    image: "/ysong.png",
    avatar: "ysong.png",
    wallet: "3j98t1W97Xl0...",
    floor: "0.14 PED",
    volume: "1,054 PED",
  }
];

const StreamVideo = () => {
  const [showVideo, setShowVideo] = useState(false);
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
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {data ? (
            data.map((video, idx) => <CardStreamVideo video={video} key={idx} setShowVideo={setShowVideo} />)
          ) : (
            <h2>No videos Yet...</h2>
          )}
        </SimpleGrid>
      </section>
    </div>
  );
};

export default StreamVideo;
