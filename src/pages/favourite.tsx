import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
    fovouriteAsync,
    selectFav,
    selectFavStatus,
} from "@/components/Home/FeedSlice";
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
    const status = useAppSelector(selectFavStatus);
    const [page, setPage] = useState(1);
    useEffect(() => {
        if (!auth) rout.push("/login");
    }, [auth]);

    useEffect(() => {
        dispatch(fovouriteAsync(page));
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && status !== "loading" && fav?.next) {
                    setPage(fav?.next);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );
        if (ref && ref.current && fav?.next && status !== "loading") {
            observer.observe(ref.current);
        }
        return () => {
            ref.current ? observer.unobserve(ref.current) : undefined;
        };
    }, [fav?.next]);

    const handleFave = () => {
        console.log("test");
        dispatch(fovouriteAsync(page));
    };

    return (
        <Wrapper title="Избранное">
            <PostList>
                {fav?.results.map((item) => {
                    return (
                        <PostCard
                            key={item.id}
                            item={item}
                            onFave={handleFave}
                        />
                    );
                })}
            </PostList>
            <div ref={ref} />
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
