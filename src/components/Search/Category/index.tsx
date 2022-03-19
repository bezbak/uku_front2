import { CategoryItem } from "./CategoryItem";
import { ICategoryList } from "@/services/types";
import React from "react";

const Category = ({
    items,
    setCategoryId,
}: {
    items: ICategoryList[];
    setCategoryId: (id: number) => void;
}) => {
    return (
        <>
            <ul className="list-reset-default-styles category">
                {items &&
                    items.map((item) => {
                        return (
                            <CategoryItem
                                item={item}
                                key={item.id}
                                setCategoryId={setCategoryId}
                            />
                        );
                    })}
            </ul>
        </>
    );
};

export default Category;
