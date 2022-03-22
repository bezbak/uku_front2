import React, { ReactNode } from "react";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout";

export default function Global() {
    return <div></div>;
}

Global.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
