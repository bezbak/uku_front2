import React, { useEffect, useRef, useState } from "react";
import { profileFeedAsync, selectFeed, selectFeedStatus } from "./FeedSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Masonry from "../Masonry/Masonry";
import PostCard from "../Post/PostCard";
import { PostCardSkeleton } from "../Post/skeletons/PostCardSkeleton";
import Wrapper from "../Wrapper";

declare global {
    interface Window {
        yaContextCb: any;
        Ya: any;
    }
}

const injectPcodeScript = () => {
    const scriptElement = document.createElement("script");
    scriptElement.innerText = "window.yaContextCb = window.yaContextCb || []";

    document.body.appendChild(scriptElement);

    const loaderElement = document.createElement("script");
    loaderElement.src = "https://yandex.ru/ads/system/context.js";

    document.body.appendChild(loaderElement);
};

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

    useEffect(() => {
        injectPcodeScript();
    }, []);

    const addAd = (id: string) => {
        window.yaContextCb.push(() => {
            window.Ya.Context.AdvManager.render({
                renderTo: `yandex_rtb_${id}`,
                blockId: "R-A-1654405-1",
                onError: function (data: any) {
                    console.log("type", data.type); // error или warning
                    console.log("code", data.code); // Код ошибки из таблицы выше
                    console.log("text", data.text); // Текстовое описание ошибки
                },
            });
        });
    };

    return (
        <>
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
                            {feed?.results.map((item, index) => {
                                if (index !== 0 && index % 10 === 0) {
                                    //`R-A-1654405-${index / 10}`
                                    addAd(`R-A-1654405-${index / 10}`);
                                    return (
                                        <div
                                            key={item.id}
                                            id={`R-A-1654405-${index / 10}`}
                                            className="ad-block"
                                        />
                                    );
                                } else {
                                    return (
                                        <PostCard
                                            key={item.id}
                                            item={item}
                                            onFollow={updatePosts}
                                            onDelete={updatePosts}
                                            masonry={true}
                                            header={!item.is_owner}
                                        />
                                    );
                                }
                            })}
                        </Masonry>
                    </>
                )}
                <div ref={ref} />
                <style jsx global>{`
                    .masonry-list {
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        gap: 10px;
                    }

                    .ad-block {
                        width: 370px;
                        height: 450px;
                    }
                `}</style>
            </Wrapper>
        </>
    );
};

export default Home;
