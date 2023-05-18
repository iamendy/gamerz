import Layout from "../components/Layout";
import { useState } from "react";
import ActiveTermsWrapper from "../components/ActiveTermsWrapper";
import ListedTermsWrapper from "../components/ListedTermsWrapper";

const Profile = () => {
  const [tab, setTab] = useState(1);

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
              Accepted Terms
            </h1>

            <h1
              className={`${
                tab == 2 ? "bg-indigo-400" : ""
              } text-xl p-3  cursor-pointer`}
              onClick={() => setTab(2)}
            >
              My Terms
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
