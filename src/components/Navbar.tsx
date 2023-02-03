import React from "react";
import Image from "next/image";
import NextLink from "next/link";
// import MetamaskConnectButton from "./MetamaskConnectButton";
import {
  Container,
  Button,
  Box,
  Center,
  Flex,
  Spacer,
  Link,
} from "@chakra-ui/react";
const Navbar = () => {
  return (
    <Box pt={4} pb={4} bg="#0F172A" color="white">
      <Container maxW={1500}>
        <Flex>
          <Center gap={2}>
            <Image src="/logo.png" alt="logo" width={50} height={50} />
            <NextLink href="/" passHref>
              <Link fontSize="2xl">PeerDao</Link>
            </NextLink>
          </Center>

          <Spacer />

          <Center gap={12}>
            <NextLink href="/" passHref>
              <Link fontSize="2xl">About PeerDao</Link>
            </NextLink>

            <NextLink href="/proposal" passHref>
              <Link fontSize="2xl">Proposals</Link>
            </NextLink>

            <NextLink href="/" passHref>
              <Link fontSize="2xl">Stream videos</Link>
            </NextLink>

            <NextLink href="/" passHref>
              <Button color="black">Connect wallet</Button>
            </NextLink>

            {/* <MetamaskConnectButton /> */}
          </Center>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
