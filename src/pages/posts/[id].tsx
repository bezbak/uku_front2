import React, { ReactNode } from "react";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout";
import { default as _Post } from "@components/Post/Post";
import { useRouter } from "next/router";

const Post = () => {
    const router = useRouter();
    const postId = router.query.id;
    return <>{!!postId && <_Post postId={parseInt(postId as string)} />}</>;
};

export default Post;

Post.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
