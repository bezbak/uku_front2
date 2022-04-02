import React, { useEffect } from "react";
import { searchAsync, selectSearch } from "../SearchSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import PostCard from "@/components/Post/PostCard";
import PostList from "@/components/Post/PostList";

export default function Publications({ params }: { params: string | null }) {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectSearch);

    useEffect(() => {
        dispatch(
            searchAsync({
                q: params || undefined,
            })
        );
    }, [params]);

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
            </PostList>
        </div>
    );
}
