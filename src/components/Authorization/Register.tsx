import { IErroType, registerFormSchema } from "./types";
import React, { FC, FormEvent, ReactNode, useState } from "react";
import { StructError, assert } from "superstruct";
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
import _Select from "react-select";
import getFormDate from "@/utils/getFormData";
import { useRouter } from "next/router";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";

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
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const dispatch = useAppDispatch();

    const options = [
        { value: "male", label: "Мужской" },
        { value: "female", label: "Женский" },
    ];

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = getFormDate(event.currentTarget);
        setError({});
        try {
            if (location) data.region = location.id;
            if (year && month && day) {
                data.birth_date = `${year}-${month}-${day}`;
            }
            assert(data, registerFormSchema);
            await dispatch(registerAsync(data));
            rout.push("/");
        } catch (error: unknown) {
            if (error instanceof StructError) {
                const errors = error.failures().reduce((acc, err) => {
                    return { ...acc, [err.key]: true };
                }, {});
                setError(errors);
                console.log(errors);
            }
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setMonth(event.target.value as string);
        console.log(event.target.value as string);
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
                    <_Select
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
                </div>
                <div className="registration__date">
                    <div className="registration__date-day">
                        <TextField
                            label="День"
                            variant="outlined"
                            type="number"
                            inputProps={{ min: 1, max: 31 }}
                            error={error.birth_date}
                            onChange={(event) =>
                                setDay(event.currentTarget.value)
                            }
                        />
                    </div>
                    <div className="registration__date-month">
                        <FormControl fullWidth error={error.birth_date}>
                            <InputLabel>Месяц</InputLabel>
                            <Select
                                value={month}
                                label="Месяц"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>январь</MenuItem>
                                <MenuItem value={2}>февраль</MenuItem>
                                <MenuItem value={3}>март</MenuItem>
                                <MenuItem value={4}>апрель</MenuItem>
                                <MenuItem value={5}>май</MenuItem>
                                <MenuItem value={6}>июнь</MenuItem>
                                <MenuItem value={7}>июль</MenuItem>
                                <MenuItem value={8}>август</MenuItem>
                                <MenuItem value={9}>сентябрь</MenuItem>
                                <MenuItem value={10}>октябрь</MenuItem>
                                <MenuItem value={11}>ноябрь</MenuItem>
                                <MenuItem value={12}>декабрь</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="registration__date-year">
                        <TextField
                            label="Год"
                            variant="outlined"
                            error={error.birth_date}
                            type="number"
                            inputProps={{ min: 1 }}
                            onChange={(event) =>
                                setYear(event.currentTarget.value)
                            }
                        />
                    </div>
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
                    width: 100%;
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
                    z-index: 2;
                }

                .registration__input--custom--error .uku__control,
                .registration__input--custom--error .uku__placeholder {
                    border-color: red;
                    color: red;
                }

                .registration__group,
                .registration__date {
                    display: flex;
                    column-gap: 10px;
                    margin-bottom: 10px;
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

                .registration__date-day {
                    max-width: 80px;
                    width: 52px;
                    flex-grow: 5;
                }

                .registration__date-month {
                    max-width: 176px;
                    width: 115px;
                    flex-grow: 11;
                }

                .registration__date-year {
                    max-width: 112px;
                    width: 73px;
                    flex-grow: 7;
                }
            `}</style>
            <style jsx global>{`
                /* Chrome, Safari, Edge, Opera */
                body .MuiInputBase-input::-webkit-outer-spin-button,
                body .MuiInputBase-input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                /* Firefox */
                body .MuiInputBase-input[type="number"] {
                    -moz-appearance: textfield;
                }

                body .MuiTextField-root {
                    width: 100%;
                }
            `}</style>
        </div>
    );
};

export default Register;
