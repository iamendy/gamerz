import Layout from "../components/Layout";
import { useState } from "react";
import ActiveTermsWrapper from "../components/ActiveTermsWrapper";
import ListedTermsWrapper from "../components/ListedTermsWrapper";
import { useAccount, useContractRead } from "wagmi";
const Profile = () => {
  const [tab, setTab] = useState(1);
  const { address } = useAccount();

  const { data: terms, isFetching } = useContractRead({
    address: config.token.address,
    abi: config.token.abi,
    functionName: "balanceOf",
    arg,
  });

  //get amount of tokens && NFT
  return (
    <Layout>
      <div className="wrapper">
        <div className="mt-0">
          <div className="flex mb-5 space-x-3 border-b border-b-indigo-400">
            <h1
              className={`${
                tab == 1 ? "bg-indigo-400" : ""
              } text-xl p-3  cursor-pointer`}
              onClick={() => setTab(1)}
            >
              Active Terms
            </h1>

            <h1
              className={`${
                tab == 2 ? "bg-indigo-400" : ""
              } text-xl p-3  cursor-pointer`}
              onClick={() => setTab(2)}
            >
              Listed Terms
            </h1>
          </div>

          <div>
            {tab == 1 ? (
              <>
                <ActiveTermsWrapper />
              </>
            ) : (
              <ListedTermsWrapper />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Profile;
