import React, { ChangeEvent, FormEvent, useState } from "react";

import AddImageIcon from "../icons/AddImageIcon";
import Button from "../Buttons/Button";
import Icon from "../Icon";
import { setAuthConfirm } from "@/app/mainSlice";
import { useAppDispatch } from "@/app/hooks";
import { useGetToken } from "@/hooks/useGetToken";

interface IPostFormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onImage?: (event: ChangeEvent<HTMLInputElement>) => void;
    onInput?: (text: string) => void;
    imageInput?: boolean;
    description?: string;
    defaultText?: string;
}

export default function PostForm({
    onSubmit,
    onImage,
    onInput,
    imageInput = false,
    defaultText = "",
}: IPostFormProps) {
    const [text, setText] = useState(defaultText);
    const dispatch = useAppDispatch();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
        if (onInput) onInput(text);
    };
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const auth = useGetToken();
        if (auth) {
            onSubmit(event);
        } else {
            dispatch(setAuthConfirm(true));
        }
    };
    return (
        <form className="post-form" onSubmit={handleSubmit}>
            {imageInput && (
                <label className="post-form__text-label">
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hide-elements"
                        name="image"
                        onChange={onImage}
                    />
                    <div className="post-form__image-input">
                        <Icon width={22} height={19}>
                            <AddImageIcon />
                        </Icon>
                    </div>
                </label>
            )}
            <input
                type="text"
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
            >
                Опубликовать
            </Button>
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
            `}</style>
        </form>
    );
}
