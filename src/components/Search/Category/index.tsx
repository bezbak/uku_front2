import { CategoryItem } from "./CategoryItem";
import { ICategoryList } from "@/services/types";
import React from "react";

const Category = ({ items }: { items: ICategoryList[] }) => {
    return (
        <>
            <ul className="list-reset-default-styles category">
                {items &&
                    items.map((item) => {
                        return <CategoryItem item={item} key={item.id} />;
                    })}
            </ul>
        </>
    );
};

export default Category;
