import ProposalListItem from "@/components/ProposalListItem";
import { Box, SimpleGrid } from "@chakra-ui/react";

const JoinDao = () => {
  return (
    <Box p={4} bg="gray.50">
      <h1
        style={{
          fontWeight: 600,
          fontSize: "36px",
          lineHeight: "40px",
          color: "#334155",
          textAlign: "center",
        }}
      >
        Proposal Review
      </h1>
      <h2 
        style={{
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "40px",
          color: "#334155",
          textAlign: "center",
        }}
      >Cast your votes for your favorite videos</h2>

      <SimpleGrid
        columns={{ sm: 2, md: 4 }}
        spacing="8"
        p="10"
        textAlign="center"
        rounded="lg"
        color="gray.400"
      >
        <ProposalListItem />
        <ProposalListItem />
        <ProposalListItem />
        <ProposalListItem />
        <ProposalListItem />
      </SimpleGrid>
    </Box>
  );
};

export default JoinDao;
