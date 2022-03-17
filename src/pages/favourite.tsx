import React, { ReactNode, useEffect, useRef, useState } from "react";
import { fovouriteAsync, selectFav } from "@/components/Home/FeedSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout";
import PostCard from "@/components/Post/PostCard";
import PostList from "@/components/Post/PostList";
import Wrapper from "@/components/Wrapper";
import { useGetToken } from "@/hooks/useGetToken";
import { useRouter } from "next/router";

export default function Favourite() {
    const dispatch = useAppDispatch();
    const auth = useGetToken();
    const rout = useRouter();
    const ref = useRef(null);
    const fav = useAppSelector(selectFav);
    const [page, setPage] = useState(0);
    useEffect(() => {
        if (!auth) rout.push("/login");
    }, [auth]);

    useEffect(() => {
        dispatch(fovouriteAsync(page));
    }, [page]);

    return (
        <Wrapper title="Избранное">
            <PostList>
                {fav?.results.map((item) => {
                    return <PostCard key={item.id} item={item} />;
                })}
            </PostList>
        </Wrapper>
    );
}

Favourite.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
