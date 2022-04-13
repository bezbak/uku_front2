import React, { useEffect, useRef, useState } from "react";
import { searchAsync, selectSearch } from "../SearchSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import PostCard from "@/components/Post/PostCard";
import PostList from "@/components/Post/PostList";

export default function Publications({ params }: { params: string | null }) {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectSearch);
    const [page, setPage] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        setPage(1);
    }, [params]);

    useEffect(() => {
        if (page)
            dispatch(
                searchAsync({
                    q: params || undefined,
                    page: page,
                })
            );
    }, [page, params]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && posts?.next) {
                    setPage(posts?.next);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );
        if (ref && ref.current && posts?.next) {
            observer.observe(ref.current);
        }
        return () => {
            ref.current ? observer.unobserve(ref.current) : undefined;
        };
    }, [posts?.next]);

    return (
        <div className="search-publications">
            <PostList>
                {posts?.results.map((item) => {
                    return (
                        <PostCard
                            key={item.id}
                            item={item}
                            followEnable={!item.is_owner}
                        />
                    );
                })}
                <div ref={ref} />
            </PostList>
        </div>
    );
}
