import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
    fovouriteAsync,
    selectFav,
    selectFavStatus,
} from "@/components/Home/FeedSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Instance } from "bricks.js";
import Layout from "@/components/Layout";
import Masonry from "@/components/Masonry/Masonry";
import PostCard from "@/components/Post/PostCard";
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
    const [masonry, setMasonry] = useState<Instance | null>(null);
    const gutter = 10;
    const sizes = [
        { columns: 1, gutter: gutter },
        { mq: "780px", columns: 2, gutter: gutter },
        { mq: "1155px", columns: 3, gutter: gutter },
        { mq: "1540px", columns: 4, gutter: gutter },
    ];

    useEffect(() => {
        if (!auth) rout.push("/login");
    }, [auth]);

    useEffect(() => {
        handleFave();
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

    const handleFave = async () => {
        await dispatch(fovouriteAsync(page));
        masonry?.pack().update();
    };

    return (
        <Wrapper title="Избранное">
            <Masonry sizes={sizes} onInit={(masonry) => setMasonry(masonry)}>
                {fav?.results.map((item) => {
                    return (
                        <PostCard
                            key={item.id}
                            item={item}
                            onFave={handleFave}
                            masonry={true}
                        />
                    );
                })}
            </Masonry>
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
