import "react-phone-input-2/lib/style.css";

import * as React from "react";

import Avatar from "../Avatar";
import Button from "../Buttons/Button";
import CN from "classnames";
import EditIcon from "../icons/EditIcon";
import Icon from "../Icon";
import { IprofileInfo } from "@/services/types";
import PhoneInput from "react-phone-input-2";
import { authServiceToken } from "@/tokens";
import { container } from "tsyringe";
import { updateAvatarAsync } from "./ProfileSlice";
import { useAppDispatch } from "@/app/hooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import compressFile from "@/utils/compressFile";

export interface IEditProfileInfoProps {
    info: IprofileInfo | null;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
    onChange: () => void;
    open: boolean;
}

export default function EditProfileInfo({
    info,
    onSubmit,
    onClose,
    onChange,
    open = false,
}: IEditProfileInfoProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [telegramInput, setTelegramInput] = React.useState<string>("");
    const [instagramInput, setInstagramInput] = React.useState<string>("");
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(event);
    };
    const handleLogOut = () => {
        const authService = container.resolve(authServiceToken);
        authService.logOut();
        router.push("/login");
    };

    const handleImageChange = async (event: any) => {
        const formData = new FormData();
        const file = event.target.files[0];
        try {
            const compressedFile = await compressFile(file);
            formData.append("avatar", compressedFile);
            dispatch(updateAvatarAsync(formData));
        } catch (error) {
            toast.error("Что то пошло не так! попробуйте позже");
        }
    };

    React.useEffect(() => {
        if (info) {
            setTelegramInput(info.telegram || "");
            setInstagramInput(info.instagram || "");
        }
    }, [info]);
    return (
        <div
            className={CN("edit-info", {
                "edit-info--open": open,
            })}
        >
            <button
                type="button"
                className="edit-info__close button-reset-default-styles"
                onClick={onClose}
            >
                &times;
            </button>
            <div className="edit-info__avatar-wrapper">
                <Avatar
                    name="tets"
                    width={140}
                    height={140}
                    url={info?.avatar}
                />
                <label htmlFor="avatar" className="edit-info__avatar">
                    <div className="edit-info__avatar-backdrop">
                        <Icon width={24} height={19}>
                            <path
                                d="M43.2273 11.4884H36.2877V10.7749C36.2877 7.58717 33.7027 5 30.5176 5H19.4812C16.2948 5 13.711 7.58717 13.711 10.7749V11.4884H6.77016C3.58375 11.4884 1 14.0743 1 17.2634V38.2251C1 41.4128 3.58375 44 6.77016 44H43.2298C46.4163 44 49 41.4128 49 38.2251V17.2634C48.9974 14.073 46.4137 11.4884 43.2273 11.4884ZM24.9974 38.0095C18.9862 38.0095 14.0983 33.1175 14.0983 27.1013C14.0983 21.0864 18.9862 16.1931 24.9974 16.1931C31.0087 16.1931 35.8966 21.0851 35.8966 27.1013C35.8966 33.1175 31.0074 38.0095 24.9974 38.0095ZM30.7676 27.1013C30.7676 30.2826 28.1774 32.8762 24.9974 32.8762C21.8174 32.8762 19.2273 30.2826 19.2273 27.1013C19.2273 23.9187 21.8174 21.3264 24.9974 21.3264C28.1774 21.3264 30.7676 23.9187 30.7676 27.1013Z"
                                fill="currentColor"
                            />
                        </Icon>
                        <span>Изменить фото профиля</span>
                    </div>
                </label>
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    className="hide-elements"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                />
            </div>

            <div className="edit-info__number">
                <label>
                    <span className="edit-info__number-label">Номер</span>
                    <PhoneInput
                        value={info?.phone}
                        disableDropdown={true}
                        inputProps={{
                            disabled: true,
                        }}
                        inputClass="edit-info__number-input"
                        dropdownClass="edit-info__number--dropdown"
                    />
                    <button
                        type="button"
                        className="edit-info__edit-number button-reset-default-styles"
                        onClick={onChange}
                    >
                        <Icon>
                            <EditIcon />
                        </Icon>
                    </button>
                </label>
            </div>
            <form className="edit-info__form" onSubmit={handleSubmit}>
                <h3 className="edit-info__title">Контактные данные</h3>
                <label>
                    <span className="edit-info__label">Инстаграм</span>
                    <input
                        type="text"
                        className="edit-info__input"
                        placeholder="Инстаграм"
                        name="instagram"
                        value={instagramInput}
                        onChange={(event) =>
                            setInstagramInput(event.currentTarget.value)
                        }
                    />
                </label>
                <label htmlFor="">
                    <span className="edit-info__label">Номер Whats App</span>
                    <PhoneInput
                        value={info?.phone}
                        placeholder={"Номер телефона"}
                        inputProps={{
                            name: "whatsapp",
                        }}
                        inputClass="edit-info__number-input"
                        dropdownClass="edit-info__number--dropdown"
                    />
                </label>
                <label htmlFor="" className="edit-info__last-input">
                    <span className="edit-info__label">Telegram</span>
                    <input
                        type="text"
                        className="edit-info__input"
                        placeholder="Ваш ник"
                        name="telegram"
                        value={telegramInput}
                        onChange={(event) =>
                            setTelegramInput(event.currentTarget.value)
                        }
                    />
                </label>
                <Button type="submit" className="edit-info__save">
                    Сохранить
                </Button>
            </form>
            <Button type="button" outline={true} onClick={handleLogOut}>
                Выйти из аккаунта
            </Button>
            <style jsx global>{`
                .edit-info {
                    position: fixed;
                    z-index: 100;
                    top: 0;
                    width: 360px;
                    height: 100%;
                    backface-visibility: hidden;
                    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                    background: #f1f1f1;
                    left: 0;
                    transform: translateX(-100%) translateZ(0);
                    padding: 20px;
                }

                .edit-info.edit-info--open {
                    transform: translateX(0) translateZ(0);
                }

                .edit-info__avatar-wrapper {
                    position: relative;
                    text-align: center;
                }

                .edit-info__avatar {
                    cursor: pointer;
                }

                .edit-info .edit-info__input {
                    border-radius: 8px;
                    background: #ffffff;
                    border: 1px solid #cacaca;
                    outline: none;
                    width: 100%;
                    padding: 13px 16px;
                    margin-bottom: 10px;
                }

                .edit-info__last-input {
                    margin-top: 10px;
                    display: block;
                }

                .edit-info__close {
                    font-size: 24px;
                    position: absolute;
                    right: 24px;
                    z-index: 1;
                }

                .edit-info__number {
                    position: relative;
                }

                .edit-info .edit-info__number-input {
                    width: 100%;
                    height: 44px;
                }

                .login__form .edit-info__number--dropdown {
                    border-right: 0;
                    background: #fff;
                }

                .edit-info__number-label {
                    font-size: 14px;
                    display: block;
                    margin-bottom: 6px;
                }

                .edit-info__title {
                    font-weight: 500;
                    font-size: 14px;
                    margin: 32px 0 12px;
                }

                .edit-info__label {
                    font-size: 12px;
                    display: block;
                    color: #aaaaaa;
                    margin-bottom: 4px;
                }

                .edit-info__save {
                    margin: 24px 0 12px;
                }

                .edit-info__edit-number {
                    position: absolute;
                    bottom: 15px;
                    right: 20px;
                    color: #667689;
                }

                .edit-info__avatar-backdrop {
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    position: absolute;
                    background: linear-gradient(
                        0deg,
                        rgba(174, 174, 174, 0.7),
                        rgba(174, 174, 174, 0.7)
                    );
                    top: 0;
                    display: flex;
                    flex-flow: column;
                    justify-content: space-evenly;
                    align-items: center;
                    color: #fff;
                    left: 50%;
                    transform: translateX(-50%);
                }

                .edit-info__avatar-backdrop span {
                    display: block;
                    line-height: initial;
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
}
