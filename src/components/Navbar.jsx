import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead } from "wagmi";
import { useRouter } from "next/router";
import config from "../config";
import { ethers } from "ethers";

const Navbar = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const { data } = useContractRead({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  return (
    <nav className="bg-indigo-800">
      <div className="wrapper">
        <div className=" flex justify-between items-center ">
          <Link href="/">
            <span className="font-bold lg:text-xl">Gamer ⚡</span>
          </Link>
          <div className="flex items-center space-x-4">
            {isConnected && (
              <div className="space-x-5 ">
                <span className="font-bold">
                  {ethers.utils.formatEther(data || "0")} NRN
                </span>
                <Link
                  className={`${
                    router.pathname == "/new-term"
                      ? "text-white rounded-lg bg-slate-400 p-2"
                      : ""
                  }`}
                  href="/new-term"
                >
                  New Term
                </Link>
                <Link
                  className={`${
                    router.pathname == "/profile"
                      ? "text-white rounded-lg bg-slate-400 p-2"
                      : ""
                  }`}
                  href="/profile"
                >
                  Profile
                </Link>
              </div>
            )}
            <ConnectButton accountStatus={"avatar"} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
