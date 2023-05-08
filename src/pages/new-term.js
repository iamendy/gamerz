import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import NewTermModal from "../components/NewTermModal";
import NewTermProvider from "../contexts/NewTermContext";
import NewTermForm from "../components/NewTermForm";

const NewTerm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = (st) => setIsOpen(st);

  return (
    <Layout>
      <NewTermProvider>
        <div className="relative">
          <NewTermModal isOpen={isOpen} toggle={toggle} />

          <NewTermForm toggle={toggle} />
        </div>
      </NewTermProvider>
    </Layout>
  );
};
export default NewTerm;
