import React, { useEffect, useRef, useState } from "react";
import { profileFeedAsync, selectFeed, selectFeedStatus } from "./FeedSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import Wrapper from "../Wrapper";

const Home = () => {
    const feed = useAppSelector(selectFeed);
    const status = useAppSelector(selectFeedStatus);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const ref = useRef(null);

    useEffect(() => {
        dispatch(profileFeedAsync(page));
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    status !== "loading" &&
                    feed?.next
                ) {
                    setPage(feed?.next);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );
        if (ref && ref.current && feed?.next && status !== "loading") {
            observer.observe(ref.current);
        }
        return () => {
            ref.current ? observer.unobserve(ref.current) : undefined;
        };
    }, [feed?.next]);

    const handleFollow = () => {
        dispatch(profileFeedAsync(1));
    };

    return (
        <Wrapper title="Лента">
            <PostList>
                {feed?.results.map((item) => {
                    return (
                        <PostCard
                            key={item.id}
                            item={item}
                            onFollow={handleFollow}
                        />
                    );
                })}
            </PostList>
            <div ref={ref} />
        </Wrapper>
    );
};

export default Home;
