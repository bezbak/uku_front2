import { categorySearchAsync, selectSearchCategory } from "../SearchSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { CategoryItem } from "../Category/CategoryItem";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Categories({ params }: { params: string | null }) {
    const categories = useAppSelector(selectSearchCategory);
    const dispatch = useAppDispatch();
    const rout = useRouter();

    useEffect(() => {
        dispatch(categorySearchAsync());
    }, []);

    useEffect(() => {
        if (params !== null)
            dispatch(
                categorySearchAsync({
                    q: params,
                })
            );
    }, [params]);

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
            </ul>

            <style jsx>{``}</style>
        </div>
    );
}
