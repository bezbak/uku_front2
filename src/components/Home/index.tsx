import { profileFeedAsync, selectFeed, selectPage } from "./FeedSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Container from "../Container";
import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import Wrapper from "../Wrapper";
import { useEffect } from "react";

const Home = () => {
    const feed = useAppSelector(selectFeed);
    const page = useAppSelector(selectPage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(profileFeedAsync(page));
    }, [page]);

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
