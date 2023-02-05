import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import MetamaskConnectButton from "./MetamaskConnectButton";
import {
  Container,
  Button,
  Box,
  Center,
  Flex,
  Spacer,
  Link,
  Text,
} from "@chakra-ui/react";
import { useWallet } from "@/context/MetamaskProvider";


const Navbar = () => {
  const { address, daoContract, tokenContract } = useWallet();

  return (
    <Box pt={4} pb={4} bg="#0F172A" color="white">
      <Container maxW={1500}>
        <Flex>
          <Center gap={2}>
            <Image src="/logo.png" alt="logo" width={50} height={50} />

            <NextLink href="/" passHref>
              <Text fontSize="2xl">PeerDao</Text>
            </NextLink>
          </Center>

          <Spacer />

          <Center gap={12}>
            <NextLink href="/" passHref>
              <Text fontSize="2xl">About PeerDao</Text>
            </NextLink>

            <NextLink href="/proposal" passHref>
              <Text fontSize="2xl">Proposals</Text>
            </NextLink>

            <NextLink href="/create" passHref>
              <Text fontSize="2xl">Submit Proposal</Text>
            </NextLink>

            <NextLink href="/" passHref>
              <Text fontSize="2xl">Stream videos</Text>
            </NextLink>

            <MetamaskConnectButton />
          </Center>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
