import { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import MetamaskConnectButton from "../../components/MetamaskConnectButton";
import UploadEncryptedFiles from "../../components/UploadEncryptedFiles";
import AccessControll from "../../components/AccessControll";
import DecryptFile from "../../components/DecryptFile";

const Dashboard = () => {
  const [cid, setCid] = useState(null);

  return (
    <Box>
      <Container display="flex" flexDirection="column">
        Here we are
        <UploadEncryptedFiles setCid={setCid} />
        <br />
        <br />
        <br />
        <p>Who is going to have access to this: </p>
        <strong>QmSm12h26jZGrgbVXxaeTf1XPULEAYZupcFwfoMMTNec3S</strong>
        {/* {cid && <AccessControll cid={cid} />} */}
        <AccessControll cid={cid || ""} />
        <DecryptFile />
        <MetamaskConnectButton />
      </Container>
    </Box>
  );
};

export default Dashboard;
