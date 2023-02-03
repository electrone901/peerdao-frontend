import { Box, Button, Image } from "@chakra-ui/react";

const ProposalListItem = () => {
  return (
    <Box boxShadow="md" p="4" rounded="md" bg="white">
      <Image
        src="video.png"
        alt="thumbnail"
        rounded="md"
        w={"100vh"}
        mb={1}
      />
      <h1>Proposer: 3j9ty6C... </h1>
      <h2>Description: A video</h2>
      <Box p="2" rounded="md" bg="#1E293B" display="flex" mt="1">
        <Box p="2" rounded="md" flex={1} textAlign="left">
          <p >Upvote: 24 </p>
          <p>Downvote: 24</p>
        </Box>

        <Box p="0" rounded="md" bg="#1E293B" >
          <p>Vote </p>

          <Button variant="ghost">
            <Image
              src="downvote.png"
              rounded="md"
            />
          </Button>

          <Button variant="ghost">
            <Image
              src="upvote.png"
              rounded="md"
            />
          </Button>
          
        </Box>
      </Box>
    </Box>
  );
};

export default ProposalListItem;
