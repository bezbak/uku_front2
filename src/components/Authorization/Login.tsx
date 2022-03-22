import "react-phone-input-2/lib/style.css";

import React, { FC, FormEvent } from "react";
import { changeNumber, loginAsync, selectPhone } from "./authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Button from "../Buttons/Button";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import { newPhoneAsync } from "../MyProfile/ConfirmSlice";
import { useRouter } from "next/router";

interface ILoginProps {
    status: string;
    message?: string;
    type: "new" | "login";
}

const Login: FC<ILoginProps> = ({ status, message, type }) => {
    const phone = useAppSelector(selectPhone);
    const rout = useRouter();
    const dispatch = useAppDispatch();
    const onChangePhone = (number: string) => {
        dispatch(changeNumber(`+${number}`));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (type === "login") {
            dispatch(loginAsync(phone));
        } else {
            dispatch(
                newPhoneAsync({
                    phone,
                    rout,
                })
            );
        }
    };
    return (
        <div className="login">
            <div className="login__header">
                <h3>{type === "login" ? "Вход" : "Введите новый номер"}</h3>
                <Link href={"/"}>
                    <button className="login__button">Отмена</button>
                </Link>
            </div>
            <form
                onSubmit={(event) => handleSubmit(event)}
                className="login__form"
            >
                {message && <span className="login__error">{message}</span>}
                <PhoneInput
                    country={"kg"}
                    value={phone || undefined}
                    inputProps={{
                        required: true,
                        name: "phone",
                        autoFocus: true,
                        maxLength: 16,
                    }}
                    placeholder="Номер"
                    inputClass="login__form-input"
                    dropdownClass="login__form-dropdown"
                    onChange={(num) => onChangePhone(num)}
                />
                <Button
                    type="submit"
                    className="login__next"
                    disable={phone.length < 1}
                    loading={status === "loading"}
                >
                    Далее
                </Button>
            </form>
            <style jsx global>{`
                .login__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 28px;
                }

                .login__error {
                    display: block;
                    margin-bottom: 10px;
                    color: #d61414;
                    font-size: 13px;
                }

                .login__button {
                    border: none;
                    background: none;
                    color: #e56366;
                    cursor: pointer;
                }
                .login__next {
                    margin-top: 10px;
                }

                .login__form .login__form-input {
                    width: 100%;
                    height: 44px;
                }

                .login__form .login__form-dropdown {
                    border-right: 0;
                    background: #fff;
                }
            `}</style>
        </div>
    );
};

export default Login;
