import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Home from "@/components/Home";
import Layout from "@/components/Layout";
import { ReactNode } from "react";

const Search = () => {
    return <div>search</div>;
};

export default Search;

Search.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
