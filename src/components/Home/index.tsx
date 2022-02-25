import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import Container from "../Container";
import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import { profileFeedAsync, selectFeed, selectPage } from "./FeedSlice";

const Home = () => {
    const feed = useAppSelector(selectFeed);
    const page = useAppSelector(selectPage);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(profileFeedAsync(page));
    }, [page]);

    return (
        <div className="home">
            <Container>
                <div className="home__inner">
                    <h2 className="home__title">Лента</h2>
                    <div className="home__content">
                        <PostList>
                            {feed?.results.map((item) => {
                                return <PostCard key={item.id} item={item} />;
                            })}
                        </PostList>
                    </div>
                </div>
            </Container>
            <style jsx>
                {`
                    .home__inner {
                        margin-top: 32px;
                    }

                    .home__title {
                        margin-bottom: 24px;
                        font-weight: 500;
                        color: #121213;
                    }
                `}
            </style>
        </div>
    );
};

export default Home;
