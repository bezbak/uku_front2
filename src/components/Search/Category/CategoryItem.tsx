import * as React from "react";

import CN from "classnames";
import Category from ".";
import { ICategoryList } from "@/services/types";
import Icon from "@/components/Icon";
import RigthArrowIcon from "@/components/icons/RightArrowIcon";
import { setCategoryId } from "@/app/mainSlice";
import { useAppDispatch } from "@/app/hooks";

export interface ICategoryItemProps {
    item: ICategoryList;
}

export function CategoryItem({ item }: ICategoryItemProps) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleClick = (item: ICategoryList, isOpeneble: boolean) => {
        if (!isOpeneble) dispatch(setCategoryId(item.id));
        setOpen(!open);
    };

    return (
        <li key={item.id} className="category__item">
            <button
                type="button"
                className="button-reset-default-styles category__button"
                onClick={() => handleClick(item, item.children.length > 0)}
            >
                <div className="category__title">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt=""
                            className="category__img"
                        />
                    ) : null}
                    {item.name}
                </div>
                {item.children.length > 0 && (
                    <Icon>
                        <RigthArrowIcon />
                    </Icon>
                )}
            </button>
            <div
                className={CN("category_child", {
                    "category_child--open": open,
                })}
            >
                {item.children.length > 0 && (
                    <Category items={item.children as ICategoryList[]} />
                )}
            </div>
            <style jsx>
                {`
                    .category__button {
                        display: flex;
                        align-items: center;
                        column-gap: 20px;
                        width: 100%;
                        justify-content: space-between;
                        line-height: initial;
                        text-align: start;
                    }

                    .category__title {
                        display: flex;
                        align-items: center;
                        column-gap: 4px;
                    }

                    .category__img {
                        width: 24px;
                    }

                    .category__item {
                        margin-bottom: 27px;
                    }

                    .category_child {
                        display: none;
                        margin-top: 20px;
                    }

                    .category_child--open {
                        display: block;
                    }
                `}
            </style>
        </li>
    );
}
