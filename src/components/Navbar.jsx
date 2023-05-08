import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
const Navbar = () => {
  const { isConnected } = useAccount();
  return (
    <nav className="bg-indigo-800">
      <div className="wrapper">
        <div className=" flex justify-between items-center ">
          <Link href="/">
            <span className="font-bold lg:text-xl">Gamer ⚡</span>
          </Link>
          <div className="flex items-center space-x-4">
            {isConnected && (
              <div className="space-x-5">
                <Link href="/new-term">New Term</Link>
                <Link href="/profile">Profile</Link>
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
