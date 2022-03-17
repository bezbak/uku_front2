import React, { ReactNode } from "react";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Home from "@/components/Home";
import Layout from "@/components/Layout";

const Index = () => {
    return <Home />;
};

export default Index;

Index.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
