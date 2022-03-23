import { CategoryItem } from "./CategoryItem";
import { ICategoryList } from "@/services/types";
import React from "react";

const Category = ({ items }: { items: ICategoryList[] }) => {
    return (
        <>
            <ul className="list-reset-default-styles category">
                {items &&
                    items.map((item) => {
                        return (
                            <CategoryItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                child={item.children as ICategoryList[]}
                            />
                        );
                    })}
            </ul>
        </>
    );
};

export default Category;
