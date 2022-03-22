import React, { FC } from "react";

import { ILocation } from "../../services/types";
import Icon from "../Icon";
import RigthArrowIcon from "../icons/RightArrowIcon";
import { setLocation } from "@/app/mainSlice";
import { useAppDispatch } from "@/app/hooks";

interface ILocationlistProps {
    items: ILocation[];
    onSelect: (location: ILocation[]) => void;
    onClose: () => void;
}

const LocationList: FC<ILocationlistProps> = ({ items, onSelect, onClose }) => {
    const dispatch = useAppDispatch();
    return (
        <ul className="list-reset-default-styles location-list">
            {items &&
                items.map((item) => {
                    const isOpeneble = item.children.length > 0;
                    const handleClick = () => {
                        if (isOpeneble) {
                            const locations = item.children as ILocation[];
                            onSelect([
                                {
                                    id: item.id,
                                    name: `Все ${item.name}`,
                                    children: [],
                                },
                                ...locations,
                            ]);
                        } else {
                            dispatch(setLocation(item));
                            onClose();
                        }
                    };
                    return (
                        <li
                            key={item.id}
                            className="location-list__item"
                            onClick={handleClick}
                        >
                            <div className="location-list__location">
                                <span className="location-list__name">
                                    {item.name}
                                </span>
                                {isOpeneble && (
                                    <button
                                        type="button"
                                        className="location-list__arrow button-reset-default-styles"
                                    >
                                        <Icon width={13} height={13}>
                                            <RigthArrowIcon />
                                        </Icon>
                                    </button>
                                )}
                            </div>
                        </li>
                    );
                })}
            <style jsx>{`
                .location-list {
                    max-height: 500px;
                }

                .location-list__location {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #eeeeee;
                    padding: 15px 0;
                    cursor: pointer;
                }
            `}</style>
        </ul>
    );
};
export default LocationList;
