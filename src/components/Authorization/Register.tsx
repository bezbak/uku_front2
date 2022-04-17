import "react-day-picker/lib/style.css";

import { IErroType, registerFormSchema } from "./types";
import React, { FC, FormEvent, ReactNode, useState } from "react";
import { StructError, assert } from "superstruct";
import { formatDate, parseDate } from "@/utils/formatDate";
import { registerAsync, selectPhone } from "./authSlice";
import {
    selectLocation,
    selectOpenLocationModal,
    setLocationModal,
} from "@/app/mainSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Button from "../Buttons/Button";
import CN from "classnames";
import Checkbox from "../Checkbox";
import DayPickerInput from "react-day-picker/DayPickerInput";
import Select from "react-select";
import dateFnsFormat from "date-fns/format";
import getFormDate from "@/utils/getFormData";
import { useRouter } from "next/router";

function CustomOverlay({
    classNames,
    children,
    ...props
}: {
    classNames: any;
    selectedDay: Date;
    children: ReactNode;
}) {
    return (
        <div
            className={classNames.overlayWrapper}
            style={{ marginLeft: -100, zIndex: 10000 }}
            {...props}
        >
            <div className={classNames.overlay}>{children}</div>
        </div>
    );
}

interface IRegisterProps {
    status: string;
    message?: string;
}

const Register: FC<IRegisterProps> = ({ status }) => {
    const [error, setError] = useState<IErroType>({});
    const locationModal = useAppSelector(selectOpenLocationModal);
    const rout = useRouter();
    const location = useAppSelector(selectLocation);
    const phone = useAppSelector(selectPhone);
    const dispatch = useAppDispatch();

    const options = [
        { value: "male", label: "Мужской" },
        { value: "female", label: "Женский" },
    ];

    const DATE_FORMAT = "yyyy-MM-dd";

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = getFormDate(event.currentTarget);
        setError({});
        try {
            if (location) data.region = location.id;
            assert(data, registerFormSchema);
            await dispatch(registerAsync(data));
            rout.push("/");
        } catch (error: unknown) {
            if (error instanceof StructError) {
                const errors = error.failures().reduce((acc, err) => {
                    return { ...acc, [err.key]: true };
                }, {});
                setError(errors);
            }
        }
    };

    return (
        <div className="registration">
            <div className="registratio__header">
                <h3>Регистрация</h3>
            </div>
            <form
                className="registration__form"
                onSubmit={(event) => handleSubmit(event)}
            >
                <input
                    type="text"
                    placeholder={phone}
                    className={CN("registration__input")}
                    readOnly
                />
                <input
                    type="text"
                    placeholder="Фамилия*"
                    name="last_name"
                    className={CN("registration__input", {
                        "registration__input--error": error.last_name,
                    })}
                />
                <input
                    type="text"
                    placeholder="Имя*"
                    name="first_name"
                    className={CN("registration__input", {
                        "registration__input--error": error.first_name,
                    })}
                />
                <div
                    className={CN("registration__group", {
                        "registration__group--error": error.birth_date,
                    })}
                >
                    <Select
                        id="long-value-select"
                        instanceId="long-value-select"
                        options={options}
                        placeholder="Пол*"
                        className={CN("registration__input--custom", {
                            "registration__input--custom--error": error.gender,
                        })}
                        classNamePrefix="uku"
                        name="gender"
                    />
                    <DayPickerInput
                        formatDate={formatDate}
                        format={DATE_FORMAT}
                        parseDate={parseDate}
                        placeholder={`${dateFnsFormat(
                            new Date(),
                            DATE_FORMAT
                        )}*`}
                        overlayComponent={CustomOverlay}
                        inputProps={{
                            name: "birth_date",
                            readOnly: true,
                        }}
                    />
                </div>
                <div className="registration__region">
                    <input
                        placeholder={"Выбор региона"}
                        onClick={() =>
                            dispatch(setLocationModal(!locationModal))
                        }
                        type="text"
                        className={CN("registration__input", {
                            "registration__input--error": error.region,
                        })}
                        readOnly={true}
                        value={location?.name || ""}
                        name="regionText"
                    />
                </div>
                <div className="registration__checkbox">
                    <Checkbox error={error.rule} />
                    <span className="registration__checkbox-text">
                        Принимаю <span> правила программы лояльности</span>
                    </span>
                </div>
                <Button
                    type="submit"
                    className="registration__button"
                    loading={status === "loading"}
                >
                    Сохранить
                </Button>
            </form>
            <style jsx global>{`
                .registration {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                .registratio__header {
                    width: 100%;
                    margin-bottom: 20px;
                    text-align: start;
                }

                .registration__input,
                .registration .registration__group input {
                    border-radius: 8px;
                    background: #ffffff;
                    border: 1px solid #cacaca;
                    outline: none;
                    width: 100%;
                    padding: 13px 16px;
                    margin-bottom: 10px;
                }

                .registration .registration__group--error input {
                    border-color: red;
                }

                .registration .registration__group--error input::placeholder {
                    color: red;
                }

                .registration__input--error {
                    border-color: red;
                }

                .registration__input--error::placeholder {
                    color: red;
                }

                .registration__input--custom {
                    width: 50%;
                }

                .registration__input--custom .uku__control {
                    padding: 5px 5px;
                    border-radius: 8px;
                    border-color: #cacaca;
                    box-shadow: unset;
                    color: #797777;
                    font-family: none, sans-serif;
                    font-size: 13px;
                }

                .registration__input--custom .uku__menu {
                    top: 70%;
                }

                .registration__input--custom--error .uku__control,
                .registration__input--custom--error .uku__placeholder {
                    border-color: red;
                    color: red;
                }

                .registration__group {
                    display: flex;
                    column-gap: 10px;
                }

                .registration__checkbox {
                    margin: 20px 0;
                }

                .registration__checkbox-text {
                    display: inline-block;
                    margin-left: 8px;
                    font-size: 12px;
                }

                .registration__checkbox-text span {
                    color: #e56366;
                    margin: 10px 0;
                }
            `}</style>
        </div>
    );
};

export default Register;
