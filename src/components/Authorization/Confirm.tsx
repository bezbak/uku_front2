import { IErroType, confirmFormSchema } from "./types";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { StructError, assert } from "superstruct";
import {
    confirmAsync,
    incorectNumber,
    loginAsync,
    selectPhone,
} from "./authSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Button from "../Buttons/Button";
import CN from "classnames";
import Spinner from "../Spinner";
import { changePage } from "../MyProfile/ProfileSlice";
import getFormDate from "@/utils/getFormData";
import { phoneConfirmAsync } from "../MyProfile/ConfirmSlice";
import { useRouter } from "next/router";

interface IConfirmProps {
    status: "idle" | "loading" | "failed";
    message?: string;
    confirmStatus: "idle" | "loading" | "failed";
    type: "new" | "old" | "login";
}

const Confirm: FC<IConfirmProps> = ({
    message,
    status,
    confirmStatus,
    type,
}) => {
    const [code, setCode] = useState("");
    const [time, setTime] = useState(60);
    const [error, setError] = useState<IErroType>({});
    const rout = useRouter();
    const dispatch = useAppDispatch();
    const phone = useAppSelector(selectPhone);

    const handleConfirm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = getFormDate(event.currentTarget);
        setError({});
        try {
            assert(data, confirmFormSchema);
            if (type === "login") {
                const { payload } = await dispatch(
                    confirmAsync({
                        phone,
                        confirmCode: data.code,
                    })
                );
                if ((payload as any)?.is_profile_completed) {
                    rout.push("/");
                }
            } else {
                dispatch(
                    phoneConfirmAsync({
                        code: data.code,
                        type,
                    })
                );
            }
        } catch (error: unknown) {
            if (error instanceof StructError) {
                const errors = error.failures().reduce((acc, err) => {
                    return { ...acc, [err.key]: true };
                }, {});
                setError(errors);
            }
        }
    };

    const handleIncorrectNumber = () => {
        if (type === "login") {
            dispatch(incorectNumber());
        } else if (type === "new") {
            dispatch(changePage("newConfirm"));
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time - 1);
        }, 1000);
        if (time === 0) clearInterval(timer);

        return () => clearInterval(timer);
    }, [time, status]);

    useEffect(() => {
        setError({});
    }, [code]);

    return (
        <div className="confirm">
            <h3 className="confirm__title">Подтверждение кода</h3>
            <span className="confirm__phone">
                <p>Код был отправлен на номер</p>
                <p>
                    {phone}
                    <button
                        className="confirm__incorrect button-reset-default-styles"
                        onClick={() => handleIncorrectNumber()}
                    >
                        Неверный номер?
                    </button>
                </p>
            </span>
            <form onSubmit={(event) => handleConfirm(event)}>
                {message && <span className="confirm__error">{message}</span>}
                <input
                    onChange={({ target: { value } }) => setCode(value)}
                    type="number"
                    className={CN("confirm__input", {
                        "confirm__input--error": error.code,
                    })}
                    placeholder="Код"
                    autoComplete="off"
                    name="code"
                />
                <Button
                    type="submit"
                    disable={code.length < 1}
                    loading={confirmStatus === "loading"}
                >
                    Подтвердить
                </Button>
            </form>

            <div className="confirm__resend">
                <p className="confirm__resend-text">Не пришло SMS сообщение?</p>
                <button
                    onClick={() => dispatch(loginAsync(phone))}
                    disabled={!!time}
                    className={CN("confirm__resend-button", {
                        "confirm__resend-button--active": !time,
                    })}
                >
                    {status === "loading" ? (
                        <Spinner />
                    ) : time ? (
                        <>
                            <div>Отправить снова</div>
                            <div>{(time / 100).toFixed(2)}</div>
                        </>
                    ) : (
                        "Отправить"
                    )}
                </button>
            </div>
            <style jsx>{`
                .confirm__title {
                    font-size: 24px;
                    margin-bottom: 20px;
                }

                .confirm__error {
                    display: block;
                    margin-top: 10px;
                    color: #d61414;
                    font-size: 13px;
                }

                .confirm__phone {
                    color: #828282;
                }

                .confirm__phone p {
                    font-size: 14px;
                    line-height: 21px;
                }

                .confirm__incorrect {
                    margin: 0 10px;
                    cursor: pointer;
                    color: #e56366;
                }

                .confirm__input {
                    border-radius: 8px;
                    background: #ffffff;
                    border: 1px solid #cacaca;
                    outline: none;
                    width: 100%;
                    padding: 13px 16px;
                    margin: 16px 0 30px;
                }

                .confirm__input--error {
                    border-color: red;
                    color: red;
                }

                .confirm__input--error::placeholder {
                    color: red;
                }

                .confirm__resend {
                    margin-top: 40px;
                    width: 100%;
                    text-align: center;
                }

                .confirm__resend-text {
                    color: #989797;
                    margin: 10px 0;
                }

                .confirm__resend-button {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 13px 16px;
                    border-radius: 6px;
                    background-color: rgba(102, 118, 137, 0.5);
                    color: #ffffff;
                    border: none;
                    cursor: pointer;
                }

                .confirm__resend-button--active {
                    justify-content: center;
                    background: #667689;
                }
            `}</style>
        </div>
    );
};

export default Confirm;
