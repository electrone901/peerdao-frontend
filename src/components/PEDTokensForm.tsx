import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Button,
  Text,
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
const { ethers } = require("ethers");
import { useWallet } from "../context/MetamaskProvider";

function PEDTokensForm(props) {
  const [amount, setAmount] = useState(0);
  const { daoContract, tokenContract } = useWallet();

  const handleBuyTokens = async () => {
    if (tokenContract && amount) {
      const res = await tokenContract.buyToken({
        value: ethers.utils.parseUnits(amount, "ether"),
      });
      console.log(
        "🚀 ~ file: PEDTokensForm.tsx:29 ~ handleBuyTokens ~ res",
        res
      );
    }
    // display success message
  };

  return (
    <Box bg="#1E293B" h={563} color="white" p={8}>
      <Text fontSize="2xl" style={{ textAlign: "center" }} pt={10}>
        Get PED Tokens
      </Text>
      <Text fontSize="xl" style={{ textAlign: "center" }}>
        With PED coins, you can seamlessly stream and contribute to creating a
      </Text>
      <Text fontSize="xl" style={{ textAlign: "center" }} pb={6}>
        permanent library of great videos
      </Text>

      <Center alignItems="center" mt={4}>
        <Card w={651}>
          <CardHeader>
            <Heading size="md" pt={2}>
              1 PED coin = 0.1 fil
            </Heading>
          </CardHeader>

          <CardBody>
            <Box>
              <FormControl id="studentid" mt={-5}>
                <FormLabel>Amount</FormLabel>

                <Input
                  type="number"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  placeholder="Type the required amount here"
                />
              </FormControl>
              <Center pt={4}>
                <Button onClick={handleBuyTokens}>Get PED coin</Button>
              </Center>
            </Box>
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
}

export default PEDTokensForm;
