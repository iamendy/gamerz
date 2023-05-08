import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Gamers from "../components/Gamers";
import Layout from "../components/Layout";

function Page() {
  const { isConnected } = useAccount();
  return (
    <Layout>
      <Gamers />
    </Layout>
  );
}

export default Page;
