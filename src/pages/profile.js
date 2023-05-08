import Layout from "../components/Layout";
import Link from "next/link";
import { useState } from "react";
import ActiveTermsWrapper from "../components/ActiveTermsWrapper";
import ListedTermsWrapper from "../components/ListedTermsWrapper";
const Profile = () => {
  const [terms, setTerms] = useState([{ owner: "xyz" }]);
  const [tab, setTab] = useState(1);
  return (
    <Layout>
      <div className="wrapper">
        <div>
          <h1>Oops! You do not have any listing.</h1>
          <Link
            className="bg-indigo-700 px-5 py-2 inline-block "
            href="/new-term"
          >
            Create One
          </Link>
        </div>

        <div className="mt-16">
          <div className="flex inline-block mb-5 space-x-3">
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
