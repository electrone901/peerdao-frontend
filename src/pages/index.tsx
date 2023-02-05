import React from "react";
import Image from "next/image";
import { Button, Text, Box, Center, Flex, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import PEDTokensForm from "@/components/PEDTokensForm";
import CardVideo from "@/components/CardVideo";
import { useWallet } from "../context/MetamaskProvider";
import * as R from "ramda";
import { ContractAddress } from "@/utils/constants";

const Home = () => {
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
    },
    {
      image: "/p1.png",
      avatar: "ysong.png",
      wallet: "3j98t1W97Xl0...",
      floor: "0.14 PED",
      volume: "1,054 PED",
    },
  ];

  const [loading, setLoading] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [joinDao, setJoinDao] = React.useState(false);
  const { address, daoContract, tokenContract } = useWallet();
  console.log("__🚀 tokenContract", tokenContract);
  console.log("_____🚀daoContract", daoContract);

  React.useEffect(() => {
    if (window.ethereum) {
      const unconnected =
        R.isNil(window.ethereum.selectedAddress) ||
        R.isEmpty(window.ethereum.selectedAddress);

      if (unconnected) {
        setLoading(false);
        return;
      }
    }

    setLoading(false);
  }, [address]);

  if (loading) {
    return <></>;
  }

  const toJoinDAO = async () => {
    const daoRes = await daoContract.joinDAO("x", {
      gasLimit: 2317863,
    });
    console.log("daoRes", daoRes);
  };

  const handleApprove = async () => {
    // const res = await daoContract.getAllMembers();
    // console.log("🚀 ~ file: index.tsx:148 ~ handleJoinDao ~ res", res);

    setIsLoading(true);
    const DAOContractAddress = ContractAddress.DAO;

    if (daoContract && tokenContract) {
      const _joinAmount = 50 * (10 * 18);
      const joinAmount = BigInt(_joinAmount);

      // approving the dao contract to get PED tokens from the user
      const tokenRes = await tokenContract.approve(
        DAOContractAddress,
        joinAmount
      );
      await tokenRes.wait();
      console.log("🚀 tokenRes", tokenRes);
      setJoinDao(true);

      if (tokenRes) {
        setJoinDao(true);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>PeerDAO</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="hero">
        <Box bg="#1E293B" h={660} color="white" p={16}>
          <Text
            fontSize="2xl"
            pt={20}
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "48px",
              lineHeight: "48px",
            }}
          >
            PERMANENTLY CREATE A REPOSITORY OF
          </Text>
          <Text
            fontSize="2xl"
            pt={6}
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "48px",
              lineHeight: "48px",
            }}
          >
            GREAT VIDEO CONTENT
          </Text>
          <Text
            pt={8}
            style={{
              textAlign: "center",
              fontWeight: "500",
              fontSize: "24px",
              lineHeight: "32px",
            }}
          >
            Be a part of preserving video content for future generations. Access
            a diverse library of video content, network and collaborate with
            other content creators. Earn rewards for your contributions to the
            DAO. Get started now by becoming a member of PeerDao and help us
            build a future where video content is preserved for all to enjoy.
          </Text>

          <Center alignItems="center" gap={4} pt={12}>
            <Button
              bg="#036b1f"
              style={{
                padding: "16px",
                textAlign: "center",
                fontWeight: "500",
                fontSize: "24px",
                lineHeight: "32px",
                width: "300px",
                height: "56px",
              }}
              onClick={handleApprove}
            >
              Approve
            </Button>

            <Button
              bg="#4F46E5"
              style={{
                padding: "16px",
                textAlign: "center",
                fontWeight: "500",
                fontSize: "24px",
                lineHeight: "32px",
                width: "300px",
                height: "56px",
              }}
              onClick={toJoinDAO}
            >
              Join DAO
            </Button>

            <Button
              bg="#334155"
              style={{
                padding: "16px",
                textAlign: "center",
                fontWeight: "500",
                fontSize: "24px",
                lineHeight: "32px",
                width: "300px",
                height: "56px",
              }}
            >
              Get PED tokens
            </Button>
          </Center>
        </Box>
      </section>

      <section className="overview">
        <Flex bg="#f5f7fb" color="black" height={535}>
          <Box
            style={{
              width: "794px",
            }}
            mt={-1}
          >
            <Image src="/video.png" alt="video" width={590} height={490} />
          </Box>

          <Box
            style={{
              width: "100%",
            }}
          >
            <Box p={10}>
              <Text fontSize="4xl" style={{ textAlign: "center" }} p={8}>
                What is PEERDAO?
              </Text>

              <Text
                fontSize="2xl"
                pb={8}
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "28px",
                  textAlign: "justify",
                }}
              >
                PeerDao is a decentralized autonomous organization dedicated to
                preserving video content for generations to come. It is a
                decentralized platform for content creators where they
                contribute to create a permanent repository of great content and
                members are awarded based on their contributions.
              </Text>

              <Text
                fontSize="2xl"
                pb={4}
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "28px",
                  textAlign: "justify",
                }}
              >
                The platform aims to run itself automatically by using the funds
                gotten from the streaming platform to continously pay for
                storage on filecoin.
              </Text>
              <Text
                fontSize="2xl"
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "28px",
                  textAlign: "justify",
                }}
              >
                Our mission is to gather content from DAO members and curate it
                into a permanent archive that can be shared and ensured for
                years to come. We believe that video content is a powerful tool
                for storytelling and should be protected and preserved for
                future generations.
              </Text>
            </Box>
          </Box>
        </Flex>
      </section>

      <section className="tokens">
        <PEDTokensForm />
      </section>

      <section className="popular_videos">
        <Text
          fontSize="4xl"
          style={{ fontWeight: "500", fontSize: "24px", lineHeight: "32px" }}
          pl={12}
          pt={10}
        >
          Popular videos
        </Text>
        <SimpleGrid
          p={10}
          spacing={6}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {data ? (
            data.map((video, idx) => <CardVideo video={video} key={idx} />)
          ) : (
            <h2>No videos Yet...</h2>
          )}
        </SimpleGrid>
      </section>
    </>
  );
};

export default Home;
