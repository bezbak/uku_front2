import React, { useEffect, useRef, useState } from "react";
import { profileFeedAsync, selectFeed, selectFeedStatus } from "./FeedSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Masonry from "../Masonry/Masonry";
import PostCard from "../Post/PostCard";
import { PostCardSkeleton } from "../Post/skeletons/PostCardSkeleton";
import Wrapper from "../Wrapper";

const Home = () => {
    const feed = useAppSelector(selectFeed);
    const status = useAppSelector(selectFeedStatus);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);
    const gutter = 10;
    const sizes = [
        { columns: 1, gutter: gutter },
        { mq: "780px", columns: 2, gutter: gutter },
        { mq: "1155px", columns: 3, gutter: gutter },
        { mq: "1540px", columns: 4, gutter: gutter },
    ];

    const updateMasonry = () => {
        setLoading(false);
    };

    useEffect(() => {
        dispatch(profileFeedAsync(page));
    }, [page]);

    useEffect(() => {
        if (status === "idle") {
            setLoading(false);
        } else {
            setLoading(true);
        }

        return () => {
            setLoading(true);
        };
    }, [status]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loading && feed?.next) {
                    setPage(feed?.next);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );
        if (ref && ref.current && feed?.next && !loading) {
            observer.observe(ref.current);
        }
        return () => {
            ref.current ? observer.unobserve(ref.current) : undefined;
        };
    }, [feed?.next, loading]);

    const updatePosts = () => {
        dispatch(profileFeedAsync(1));
    };

    return (
        <Wrapper title="Лента">
            {loading ? (
                <div className="masonry-list">
                    {Array(6)
                        .fill(null)
                        .map((_, index) => {
                            return <PostCardSkeleton key={index} />;
                        })}
                </div>
            ) : (
                <>
                    <Masonry sizes={sizes} onUpdate={updateMasonry}>
                        {feed?.results.map((item) => {
                            return (
                                <PostCard
                                    key={item.id}
                                    item={item}
                                    onFollow={updatePosts}
                                    onDelete={updatePosts}
                                    masonry={true}
                                />
                            );
                        })}
                    </Masonry>
                </>
            )}
            <div ref={ref} />
            <style jsx>{`
                .masonry-list {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 10px;
                }
            `}</style>
        </Wrapper>
    );
};

export default Home;
