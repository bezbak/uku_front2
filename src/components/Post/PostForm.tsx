import React, { ChangeEvent, FormEvent, useState } from "react";

import Button from "../Buttons/Button";
import { useGetToken } from "@/hooks/useGetToken";
import { useAppDispatch } from "@/app/hooks";
import { setAuthConfirm } from "@/app/mainSlice";
import Spinner from "../Spinner";

interface IPostFormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onImage?: (event: ChangeEvent<HTMLInputElement>) => void;
    onInput?: (text: string) => void;
    imageInput?: boolean;
    description?: string;
    defaultText?: string;
    loading?: boolean;
}

export default function PostForm({
    onSubmit,
    onImage,
    onInput,
    imageInput = false,
    defaultText = "",
    loading = false,
}: IPostFormProps) {
    const [text, setText] = useState(defaultText);
    const dispatch = useAppDispatch();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
        if (onInput) onInput(text);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(event);
    };

    const checkLogin = () => {
        const auth = useGetToken();
        if (!auth) {
            dispatch(setAuthConfirm(true));
        }
    };

    return (
        <form className="post-form" onSubmit={handleSubmit}>
            {imageInput && (
                <label className="post-form__button-test" onClick={checkLogin}>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hide-elements"
                        name="image"
                        disabled={!useGetToken()}
                        onChange={onImage}
                    />
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.9996 7.32715V14.6535"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M14.6663 10.9904H7.33301"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
            )}
            <input
                type="text"
                autoComplete="off"
                placeholder="Введите описание объявления"
                className="post-form__input"
                name="text"
                value={text}
                onChange={handleInputChange}
                required
            />
            <Button
                type="submit"
                className="button-reset-default-styles post-form__button"
                loading={loading}
            >
                Опубликовать
            </Button>
            <button
                type="submit"
                className="post-form__button-test post-form__button-mobile"
            >
                {loading ? (
                    <Spinner />
                ) : (
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.8554 6.12111L8.1916 11.8227L1.56064 7.74147C0.691759 7.20657 0.867871 5.88697 1.8467 5.60287L17.5022 1.04743C18.3925 0.789782 19.2156 1.62446 18.949 2.51889L14.304 18.1582C14.013 19.1369 12.7082 19.3064 12.1809 18.4325L8.1916 11.8227"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </button>
            <style jsx global>{`
                .post-form {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    column-gap: 12px;
                }

                .post-form__image-input {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 38px;
                    width: 38px;
                    background: #f8f8f8;
                    border-radius: 65px;
                    color: #9da5ae;
                }

                .post-form__input {
                    width: -webkit-fill-available;
                    font-size: 16px;
                    padding: 12px 14px;
                    background: #f8f8f8;
                    border: 1px solid #e0e0e0;
                    border-radius: 6px;
                }

                .post-form .post-form__button.button {
                    width: 147px;
                }

                .post-form__button-test {
                    padding: 10px 12px;
                    border-radius: 6px;
                    background-color: #e56366;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                }

                .post-form__button-mobile {
                    display: none;
                }

                @media all and (max-width: 490px) {
                    .post-form__button {
                        display: none;
                    }
                    .post-form__button-mobile {
                        display: block;
                    }
                }
            `}</style>
        </form>
    );
}
