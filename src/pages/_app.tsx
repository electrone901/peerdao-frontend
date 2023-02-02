import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MetamaskProvider } from "../context/MetamaskProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <MetamaskProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </MetamaskProvider>
    </ChakraProvider>
  );
};

export default App;
