import React, { useEffect, useRef, useState } from "react";
import { searchAsync, selectSearch } from "../SearchSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import PostCard from "@/components/Post/PostCard";
import PostList from "@/components/Post/PostList";

const injectPcodeScript = () => {
    const scriptElement = document.createElement("script");
    scriptElement.innerText = "window.yaContextCb = window.yaContextCb || []";

    document.body.appendChild(scriptElement);

    const loaderElement = document.createElement("script");
    loaderElement.src = "https://yandex.ru/ads/system/context.js";

    document.body.appendChild(loaderElement);
};

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

    useEffect(() => {
        injectPcodeScript();
    }, []);

    const addAd = (id: string, page: number) => {
        window.yaContextCb.push(() => {
            window.Ya.Context.AdvManager.render({
                renderTo: `yandex_rtb_${id}`,
                blockId: "R-A-1654405-1",
                onError: function (data: any) {
                    console.log("type", data.type); // error или warning
                    console.log("code", data.code); // Код ошибки из таблицы выше
                    console.log("text", data.text); // Текстовое описание ошибки
                },
                pageNumber: page,
            });
        });
    };

    return (
        <div className="search-publications">
            <PostList>
                {posts?.results.map((item, index) => {
                    if (index !== 0 && index % 10 === 0) {
                        addAd(`R-A-1654405-1-${index / 10}`, index / 10);
                        return (
                            <div key={item.id} className="ad-block">
                                <div
                                    id={`yandex_rtb_R-A-1654405-1-${
                                        index / 10
                                    }`}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <PostCard
                                key={item.id}
                                item={item}
                                followEnable={!item.is_owner}
                            />
                        );
                    }
                })}
                <div ref={ref} />
            </PostList>
        </div>
    );
}
