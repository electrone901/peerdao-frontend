import React from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Button,
  Text,
  Box,
  Center,
  Flex,
  Spacer,
  Link,
} from "@chakra-ui/react";
const Footer = () => {
  return (
    <Box pt={4} pb={4} bg="#0F172A" color="white">
      <Center gap={2}>
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <Text fontSize="2xl">PeerDao</Text>
        <Text fontSize="2xl">2023</Text>
      </Center>
    </Box>
  );
};

export default Footer;
