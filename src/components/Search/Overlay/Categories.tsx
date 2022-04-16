import { categorySearchAsync, selectSearchCategory } from "../SearchSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { CategoryItem } from "../Category/CategoryItem";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Categories({ params }: { params: string | null }) {
    const categories = useAppSelector(selectSearchCategory);
    const dispatch = useAppDispatch();
    const rout = useRouter();
    const [page, setPage] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        setPage(1);
    }, [params]);

    useEffect(() => {
        if (page)
            dispatch(
                categorySearchAsync({
                    q: params || undefined,
                    page: page,
                })
            );
    }, [page, params]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && categories?.next) {
                    setPage(categories?.next);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );
        if (ref && ref.current && categories?.next) {
            observer.observe(ref.current);
        }
        return () => {
            ref.current ? observer.unobserve(ref.current) : undefined;
        };
    }, [categories?.next]);

    const handleOpen = () => {
        rout.push("/search");
    };

    return (
        <div className="search-categories" onClick={handleOpen}>
            <ul className="list-reset-default-styles">
                {categories?.results.map((category) => {
                    return (
                        <CategoryItem
                            key={category.id}
                            id={category.id}
                            image={category.image}
                            name={category.name}
                            showArrow={true}
                        />
                    );
                })}
                <div ref={ref} />
            </ul>
        </div>
    );
}
