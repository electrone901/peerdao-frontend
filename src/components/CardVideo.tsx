import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  Text,
  Center,
  Spacer,
  Flex,
  Avatar,
} from "@chakra-ui/react";

function CardVideo({ video }) {
  const [amount, setAmount] = useState(0);
  console.log({ amount });
  return (
    <Card maxW="sm" p={1}>
      <CardBody>
        <Image
          width={800}
          height={600}
          src={video.image}
          alt="Green double couch with wooden legs"
        />

        <Flex pt={2}>
          <Center gap={5}>
            <Avatar src="/p1.png" w={50} h={50} />
            <Text
              style={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#000000",
              }}
            >
              {video.wallet}
            </Text>
            <Image
              src="/check-icon.png"
              alt="check-icon.png"
              width={20}
              height={20}
            />
          </Center>
        </Flex>

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
            {video.floor}
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
            {video.volume}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default CardVideo;
