import { Dispatch, FC, SetStateAction } from "react";
import { ILocation } from "../../services/types";
import Icon from "../Icon";
import RigthArrowIcon from "../icons/RightArrowIcon";
interface ILocationlistProps {
    items: ILocation;
    setLocation: Dispatch<
        SetStateAction<{
            id: number;
            name: string;
        }>
    >;
    setSelectedLocation: Dispatch<
        SetStateAction<
            {
                id: number;
                name: string;
                children: Record<string, unknown>[];
            }[]
        >
    >;
}

const LocationList: FC<ILocationlistProps> = ({
    items,
    setLocation,
    setSelectedLocation,
}) => {
    return (
        <ul className="list-reset-default-styles location-list">
            {items &&
                items.map((item) => {
                    return (
                        <li
                            key={item.id}
                            className="location-list__item"
                            onClick={() => setLocation(item)}
                        >
                            <div className="location-list__location">
                                <span className="location-list__name">
                                    {item.name}
                                </span>
                                {item.children &&
                                    (item.children ? (
                                        <button
                                            type="button"
                                            className="location-list__arrow button-reset-default-styles"
                                            onClick={() =>
                                                setSelectedLocation(
                                                    item.children as ILocation
                                                )
                                            }
                                        >
                                            <Icon width={13} height={13}>
                                                <RigthArrowIcon />
                                            </Icon>
                                        </button>
                                    ) : null)}
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
                }
            `}</style>
        </ul>
    );
};
export default LocationList;
