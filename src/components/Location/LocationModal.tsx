import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { locationAsync, selectLocation } from "./locationSlice";
import {
    initLocation,
    selectOpenLocationModal,
    setLocation,
    setLocationModal,
} from "@/app/mainSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { ILocation } from "@/services/types";
import LocationList from "./LocationList";
import Modal from "../Modal/Modal";
import Scrollable from "../Scrollable";
import { UKU_LOCATION } from "@/constants/headers";
import useDebounce from "@/hooks/useDebounce";
import Icon from "../Icon";
import RigthArrowIcon from "../icons/RightArrowIcon";

const LocationModal: FC = () => {
    const open = useAppSelector(selectOpenLocationModal);
    const [selectedLocation, setSelectedLocation] = useState<ILocation[]>([]);
    const dispatch = useAppDispatch();
    const locations = useAppSelector(selectLocation);
    const [searchParams, setSarchParams] = useState<string>("");
    const debouncedSearchTerm = useDebounce(searchParams, 300);

    const handleClose = () => {
        dispatch(setLocationModal(false));
        setSelectedLocation(locations);
    };

    useEffect(() => {
        dispatch(locationAsync());
        const location = localStorage.getItem(UKU_LOCATION);
        if (location) {
            dispatch(setLocation(JSON.parse(location)));
        } else {
            initLocation(locations[0]);
        }
    }, []);

    useEffect(() => {
        setSelectedLocation(locations);
    }, [locations]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSarchParams(event.currentTarget.value);
    };

    const handleBack = () => {
        setSelectedLocation(locations);
    };

    return (
        <Modal open={open}>
            <div className="location-modal">
                <div className="location-modal__header">
                    <button
                        type="button"
                        className="location-modal__back button-reset-default-styles"
                        onClick={handleBack}
                    >
                        <Icon width={16} height={16}>
                            <RigthArrowIcon />
                        </Icon>
                    </button>
                    <span className="location-modal__title">
                        Выберите расположение
                    </span>
                    <button
                        type="button"
                        className="location-modal__close button-reset-default-styles"
                        onClick={handleClose}
                    >
                        &times;
                    </button>
                </div>

                <div className="location-modal__body">
                    <input
                        placeholder="Введите название страны"
                        autoComplete="off"
                        type="text"
                        className="location-modal__input"
                        onChange={(event) => handleSearch(event)}
                    />
                    <Scrollable>
                        <LocationList
                            items={selectedLocation.filter((item) =>
                                item.name
                                    .toLowerCase()
                                    .includes(debouncedSearchTerm.toLowerCase())
                            )}
                            onSelect={setSelectedLocation}
                            onClose={handleClose}
                        />
                    </Scrollable>
                </div>
                <style jsx>{`
                    .location-modal {
                        position: relative;
                        z-index: 2;
                        width: 455px;
                        margin: 0.9em 0;
                        border-radius: 6px;
                        background-color: #fefefe;
                        box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05),
                            0px 1px 5px rgba(0, 0, 0, 0.15);
                    }

                    .location-modal__header {
                        display: flex;
                        justify-content: space-between;
                        padding: 16px 24px;
                        color: #000000d9;
                        background: #fff;
                        border-bottom: 1px solid #f0f0f0;
                        border-radius: 2px 2px 0 0;
                        align-items: center;
                    }

                    .location-modal__close {
                        font-size: 25px;
                    }

                    .location-modal__body {
                        padding: 24px;
                        font-size: 14px;
                        line-height: 1.5715;
                        word-wrap: break-word;
                    }

                    .location-modal__input {
                        width: 100%;
                        padding: 13px 14px;
                        font-size: 14px;
                        background: #f8f8f8;
                        border: 1px solid #e0e0e0;
                        border-radius: 6px;
                        margin-bottom: 13px;
                    }

                    .location-modal__back {
                        transform: rotate(180deg);
                        color: #000;
                    }
                `}</style>
            </div>
        </Modal>
    );
};

export default LocationModal;
