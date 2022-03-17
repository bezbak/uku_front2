import React, { useEffect, useState } from "react";
import { profileFeedAsync, selectFeed } from "./FeedSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import Wrapper from "../Wrapper";

const Home = () => {
    const feed = useAppSelector(selectFeed);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(0);

    useEffect(() => {
        dispatch(profileFeedAsync(page));
    }, [page]);

    useEffect(() => {
        console.log("es");
    }, [feed?.next]);

    return (
        <Wrapper title="Лента">
            <PostList>
                {feed?.results.map((item) => {
                    return <PostCard key={item.id} item={item} />;
                })}
            </PostList>
        </Wrapper>
    );
};

export default Home;
