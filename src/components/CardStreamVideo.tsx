import React, { useState } from "react";
import {
  Card,
  CardBody,
  Text,
  Center,
  Spacer,
  Flex,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { PeerDAO } from "@/typechain";

function CardStreamVideo({
  video,
  onClicked,
}: {
  video: PeerDAO.VideoStructOutput;
  onClicked: (video: PeerDAO.VideoStructOutput) => void;
}) {
  const [amount, setAmount] = useState(0);
  // console.log({ amount });
  return (
    <Card maxW="sm" p={1}>
      <CardBody>
        <Image
          width={800}
          height={250}
          src="video-loading.png"
          alt="Video thumnnail"
          style={{ cursor: "pointer" }}
          onClick={() => onClicked(video)}
        />

        <Flex pt={2}>
          <Center gap={5}>
            <Avatar src="/p1.png" w={50} h={50} />
            <Text
              style={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "24px",
                width: "200px",
                color: "#000000",
                overflow: "hidden",
                textAlign: "left",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {video.poster}
            </Text>
          </Center>
        </Flex>

        <Text mt={2}>{video.description}</Text>

        <Flex>
          <Text
            fontSize="2xl"
            pt={4}
            style={{
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            FLOOR
          </Text>
          <Spacer />
          <Text
            fontSize="2xl"
            pt={4}
            style={{
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            TOTAL VOLUME
          </Text>
        </Flex>

        <Flex>
          <Text
            fontSize="2xl"
            pt={4}
            style={{
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            {"0.1 $PED"}
          </Text>
          <Spacer />
          <Text
            fontSize="2xl"
            pt={4}
            style={{
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "20px",
            }}
          >
            N/A
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default CardStreamVideo;
