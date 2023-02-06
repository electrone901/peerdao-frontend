import React, { useEffect, useState } from "react";
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

import { BigNumber, utils } from "ethers";

const Navbar = () => {
  const { address, daoContract, tokenContract } = useWallet();
  const [balance, setBalance] = useState(BigNumber.from(0));

  async function getBalance() {
    const b =
      (await tokenContract?.balanceOf(address || "0x0000000000000000")) ||
      BigNumber.from(0);
    setBalance(b);
  }


  useEffect(() => {
    if (tokenContract) {
      console.log("getting balance...");
      getBalance();
    } else {
      console.log("daoContract not found");
    }
  }, [address, tokenContract]);


  
  return (
    <Box pt={4} pb={4} bg="#0F172A" color="white">
      <Container maxW={1800}>
        <Flex>
          <Center gap={2}>
            <Image src="/logo.png" alt="logo" width={50} height={50} />

            <NextLink href="/" passHref>
              <Text fontSize="2xl">PeerDao</Text>
            </NextLink>
          </Center>

          <Spacer />

          <Center gap={10}>
            <NextLink href="/" passHref>
              <Text fontSize="2xl">About PeerDao</Text>
            </NextLink>

            <NextLink href="/proposal" passHref>
              <Text fontSize="2xl">Proposals</Text>
            </NextLink>

            <NextLink href="/create" passHref>
              <Text fontSize="2xl">Submit Proposal</Text>
            </NextLink>

            <NextLink href="/stream-videos" passHref>
              <Text fontSize="2xl">Stream videos</Text>
            </NextLink>

            <Box width={100}>
              <p>$PED: {utils.formatEther(balance)}</p>
            </Box>
            <MetamaskConnectButton />
          </Center>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
