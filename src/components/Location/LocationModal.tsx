import { useAppDispatch, useAppSelector } from "@/app/hooks";
import React, {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import Modal from "../Modal/Modal";
import { locationAsync, selectLocation } from "./locationSlice";
import LocationList from "./LocationList";
import { ILocation } from "@/services/types";
import Scrollable from "../Scrollable";

interface ILocationModalProps {
    open: boolean;
    title: string;
    setLocation: Dispatch<
        SetStateAction<{
            id: number;
            name: string;
        }>
    >;
    setLocationModal: Dispatch<SetStateAction<boolean>>;
}

const LocationModal: FC<ILocationModalProps> = ({
    open,
    title,
    setLocation,
    setLocationModal,
}) => {
    const [selectedLocation, setSelectedLocation] = useState<ILocation>([]);
    const dispatch = useAppDispatch();
    const locations = useAppSelector(selectLocation);

    useEffect(() => {
        if (open) {
            dispatch(locationAsync());
        }
    }, [open]);

    useEffect(() => {
        setSelectedLocation(locations);
    }, [locations]);

    useEffect(() => {
        if (!selectedLocation.length) {
            setLocationModal(false);
        }
    }, [selectedLocation]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
    };

    return (
        <Modal open={open}>
            <div className="location-modal">
                <div className="location-modal__header">
                    <span className="location-modal__title">{title}</span>
                    <button
                        type="button"
                        className="location-modal__close button-reset-default-styles"
                        onClick={() => setLocationModal(false)}
                    >
                        &times;
                    </button>
                </div>

                <div className="location-modal__body">
                    {/* <input
                        placeholder="Поиск"
                        type="text"
                        className="registration__input"
                        onChange={(event) => handleSearch(event)}
                    /> */}
                    <Scrollable>
                        <LocationList
                            items={selectedLocation}
                            setLocation={setLocation}
                            setSelectedLocation={setSelectedLocation}
                        />
                    </Scrollable>
                </div>
                <style jsx>{`
                    .location-modal {
                        position: relative;
                        z-index: 2;
                        width: 50%;
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
                `}</style>
            </div>
        </Modal>
    );
};

export default LocationModal;
