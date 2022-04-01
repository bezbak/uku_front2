import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
} from "react-share";
import React, { FormEvent, useState } from "react";
import {
    selectActionmodal,
    setActionModal,
    setAuthConfirm,
} from "@/app/mainSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Button from "../Buttons/Button";
import FileIcon from "../icons/FileIcon";
import { FroundIcon } from "../icons/FroundIcon";
import Icon from "../Icon";
import { IndecentIcon } from "../icons/Indecenticon";
import Modal from "../Modal/Modal";
import { OtherIcon } from "../icons/OtherIcon";
import ProhibitedIcon from "../icons/ProhibitedIcon";
import { SpamIcon } from "../icons/SpamIcon";
import { complainAsync } from "@/app/systemSlice";
import getFormDate from "@/utils/getFormData";
import { toast } from "react-toastify";
import { useGetToken } from "@/hooks/useGetToken";

const ActionModal = () => {
    const open = useAppSelector(selectActionmodal);
    const dispatch = useAppDispatch();
    const [complaint, setComplaint] = useState(false);
    const [other, setOther] = useState(false);
    const [share, setShare] = useState(false);

    const handleClose = () => {
        dispatch(setActionModal(null));
        setComplaint(false);
        setShare(false);
    };

    const handleLink = () => {
        navigator.clipboard.writeText(`${location.origin}/posts/${open}/`);
        toast.success("Ссылка скопированно");
        dispatch(setActionModal(null));
    };

    const handleShare = () => {
        setShare(true);
    };

    const handleComplain = (complain: string) => {
        const auth = useGetToken();
        if (!!auth) {
            if (open) {
                dispatch(
                    complainAsync({
                        complaint_type: complain,
                        id: open,
                    })
                );
            }
        } else {
            dispatch(setAuthConfirm(true));
        }
        dispatch(setActionModal(null));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = getFormDate(event.currentTarget);
        const auth = useGetToken();
        if (!!auth) {
            if (open) {
                dispatch(
                    complainAsync({
                        complaint_type: "other",
                        id: open,
                        text: data.text as string,
                    })
                );
            }
        } else {
            dispatch(setAuthConfirm(true));
        }
        dispatch(setActionModal(null));
    };

    const complains = [
        {
            name: "wrong_category",
            text: "Неверная категория",
            desc: "Объявление находиться в неверной категории",
            icon: FileIcon,
        },
        {
            name: "prohibited_item",
            text: "Запрещенный товар",
            desc: "Наркотическая и табачная продукция, алкоголь и другие запрещенные товары",
            icon: ProhibitedIcon,
        },
        {
            name: "indecent_behavior",
            text: "Непристойное содержаение",
            desc: "Порнографическое, экстримисткое, эротическое, нецензурное содержание",
            icon: IndecentIcon,
        },
        {
            name: "fraud",
            text: "Мошенничество,",
            desc: "Обман, вымогательство, незаконные операции целью наживы",
            icon: FroundIcon,
        },
        {
            name: "spam",
            text: "Спам",
            desc: "Повторное размешение объявления о продаже одного и того же товара",
            icon: SpamIcon,
        },
        {
            name: "other",
            text: "Другое",
            desc: "Иная причина нарушения размещения объявления",
            icon: OtherIcon,
        },
    ];

    return (
        <Modal open={!!open}>
            <div className="action-modal">
                <div className="action-modal__body">
                    {share ? (
                        <>
                            <div className="action-modal__header">
                                <span className="action-modal__title">
                                    Поделиться
                                </span>
                                <button
                                    type="button"
                                    className="action-modal__close button-reset-default-styles"
                                    onClick={handleClose}
                                >
                                    &times;
                                </button>
                            </div>
                            <ul className="list-reset-default-styles">
                                <li className="action-modal__coplain">
                                    <FacebookShareButton
                                        url={`${location.origin}/posts/${open}`}
                                        quote="Uku"
                                        className="Demo__some-network__share-button"
                                    >
                                        <div className="action-modal__share-button">
                                            <div className="action-modal__coplain-icon">
                                                <FacebookIcon size={32} round />
                                            </div>

                                            <div>
                                                <h3 className="action-modal__coplain-title">
                                                    Поделиться на Facebook
                                                </h3>
                                            </div>
                                        </div>
                                    </FacebookShareButton>
                                </li>
                                <li className="action-modal__coplain">
                                    <TelegramShareButton
                                        url={`${location.origin}/posts/${open}`}
                                        title="Uku"
                                        className="Demo__some-network__share-button"
                                    >
                                        <div className="action-modal__share-button">
                                            <div className="action-modal__coplain-icon">
                                                <TelegramIcon size={32} round />
                                            </div>

                                            <div>
                                                <h3 className="action-modal__coplain-title">
                                                    Поделиться в Telegram
                                                </h3>
                                            </div>
                                        </div>
                                    </TelegramShareButton>
                                </li>
                                <li className="action-modal__coplain">
                                    <EmailShareButton
                                        url={`${location.origin}/posts/${open}`}
                                        title="Uku"
                                        className="Demo__some-network__share-button"
                                    >
                                        <div className="action-modal__share-button">
                                            <div className="action-modal__coplain-icon">
                                                <EmailIcon size={32} round />
                                            </div>

                                            <div>
                                                <h3 className="action-modal__coplain-title">
                                                    Поделиться по электронной
                                                    почте
                                                </h3>
                                            </div>
                                        </div>
                                    </EmailShareButton>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            {complaint ? (
                                <>
                                    <div className="action-modal__header">
                                        <span className="action-modal__title">
                                            Отправить жалобу
                                        </span>
                                        <button
                                            type="button"
                                            className="action-modal__close button-reset-default-styles"
                                            onClick={handleClose}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                    <div className="action-modal__complains">
                                        {other ? (
                                            <form
                                                className="action-modal__form"
                                                onSubmit={handleSubmit}
                                            >
                                                <h3 className="action-modal__form-title">
                                                    Опишите причину жалобы
                                                </h3>
                                                <textarea
                                                    placeholder="Опишите..."
                                                    className="action-modal__textarea"
                                                    name="text"
                                                    required
                                                />
                                                <Button type="submit">
                                                    Отправить
                                                </Button>
                                            </form>
                                        ) : (
                                            <>
                                                <h4 className="action-modal__reson">
                                                    Выберите причину
                                                </h4>
                                                <ul className="list-reset-default-styles">
                                                    {complains.map(
                                                        (complain, index) => (
                                                            <li
                                                                className="action-modal__coplain"
                                                                key={
                                                                    index +
                                                                    complain.name
                                                                }
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="button-reset-default-styles action-modal__coplain-button"
                                                                    onClick={() => {
                                                                        if (
                                                                            complain.name ===
                                                                            "other"
                                                                        ) {
                                                                            setOther(
                                                                                true
                                                                            );
                                                                        } else {
                                                                            handleComplain(
                                                                                complain.name
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <div className="action-modal__coplain-icon">
                                                                        <Icon
                                                                            width={
                                                                                24
                                                                            }
                                                                            height={
                                                                                24
                                                                            }
                                                                        >
                                                                            {complain.icon()}
                                                                        </Icon>
                                                                    </div>

                                                                    <div>
                                                                        <h3 className="action-modal__coplain-title">
                                                                            {
                                                                                complain.text
                                                                            }
                                                                        </h3>
                                                                        <p className="action-modal__coplain-location">
                                                                            {
                                                                                complain.desc
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </button>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="action-modal__actions">
                                        <button
                                            type="button"
                                            className="action-modal__action button-reset-default-styles"
                                            onClick={handleShare}
                                        >
                                            <Icon>
                                                <path
                                                    d="M6 25V44.2C6 45.473 6.50044 46.6939 7.39124 47.5941C8.28204 48.4943 9.49022 49 10.75 49H39.25C40.5098 49 41.718 48.4943 42.6088 47.5941C43.4996 46.6939 44 45.473 44 44.2V25"
                                                    stroke="black"
                                                    strokeWidth="6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="#e2e2e2"
                                                />
                                                <path
                                                    d="M35 11L25.5 1L16 11"
                                                    stroke="black"
                                                    strokeWidth="6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M25 1V32"
                                                    stroke="black"
                                                    strokeWidth="6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </Icon>
                                            <span>Поделиться</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="action-modal__action button-reset-default-styles"
                                            onClick={handleLink}
                                        >
                                            <Icon>
                                                <path
                                                    d="M13.2551 34.6062L34.6062 13.2551L36.741 15.3899L15.3899 36.741L13.2551 34.6062ZM21.4701 34.9305C21.7266 35.9301 21.5128 37.027 20.7299 37.8084L16.4587 42.0809C15.2792 43.2604 13.3701 43.2604 12.1891 42.0809L7.91941 37.8084C6.73844 36.6289 6.73844 34.7211 7.91941 33.5387L12.1891 29.2691C12.9704 28.4877 14.0629 28.2754 15.0625 28.526L19.5518 24.0382C16.0163 21.5288 11.0848 21.8341 7.91941 24.9995L3.64826 29.2691C0.117246 32.8016 0.117246 38.5485 3.64826 42.0809L7.91941 46.3506C11.4504 49.8831 17.1973 49.8831 20.7299 46.3506L24.9996 42.0809C28.1664 38.9141 28.4672 33.9781 25.9564 30.4426L21.4701 34.9305ZM46.3508 7.91948L42.0812 3.64833C38.5486 0.117314 32.8016 0.117314 29.2693 3.64833L24.9997 7.91948C21.8342 11.0849 21.5291 16.0165 24.0384 19.5519L28.5292 15.0611C28.2755 14.063 28.4878 12.9705 29.2694 12.189L33.539 7.91939C34.7185 6.73993 36.6292 6.73842 37.8087 7.91939L42.0812 12.189C43.2607 13.37 43.2578 15.2807 42.0812 16.4587L37.8087 20.7298C37.0273 21.5127 35.9304 21.725 34.9308 21.47L30.4429 25.9577C33.9754 28.47 38.9144 28.1663 42.0813 24.9996L46.351 20.7299C49.8832 17.1974 49.8832 11.4504 46.3508 7.91948Z"
                                                    fill="black"
                                                />
                                            </Icon>
                                            <span>Ссылка</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="action-modal__action button-reset-default-styles"
                                            style={{
                                                color: "red",
                                            }}
                                            onClick={() => setComplaint(true)}
                                        >
                                            <Icon>
                                                <path
                                                    d="M9.00705 47C8.90382 47 8.79953 46.9797 8.70005 46.938C8.40536 46.8144 8.21388 46.5261 8.21388 46.2063V37.2226H3.76885C2.24189 37.2226 1 35.9807 1 34.4538V5.76885C1 4.24189 2.24189 3 3.76885 3H46.3665C47.8935 3 49.1353 4.24243 49.1353 5.76885V34.4538C49.1353 35.9807 47.8935 37.2226 46.3665 37.2226H19.2941L9.56328 46.7727C9.41192 46.9214 9.21136 47 9.00705 47ZM3.76885 4.58686C3.11742 4.58686 2.58686 5.11689 2.58686 5.76885V34.4538C2.58686 35.1057 3.11689 35.6358 3.76885 35.6358H9.00758C9.44615 35.6358 9.80128 35.9909 9.80128 36.4295V44.3162L18.4143 35.8625C18.563 35.7171 18.7619 35.6352 18.97 35.6352H46.3665C47.0185 35.6352 47.5485 35.1052 47.5485 34.4532V5.76885C47.5485 5.11742 47.0185 4.58686 46.3665 4.58686H3.76885V4.58686Z"
                                                    fill="currentColor"
                                                    strokeWidth="6"
                                                />
                                                <path
                                                    d="M25.0678 23.8966C23.1938 23.8966 21.6689 22.3718 21.6689 20.4983V10.8503C21.6689 9.71221 22.5953 8.78587 23.7334 8.78587H26.4017C27.5399 8.78587 28.4657 9.71221 28.4657 10.8503V20.4977C28.4662 22.3718 26.9419 23.8966 25.0678 23.8966ZM23.7334 10.3733C23.4697 10.3733 23.2558 10.5872 23.2558 10.8509V20.4983C23.2558 21.4973 24.0688 22.3098 25.0678 22.3098C26.0669 22.3098 26.8793 21.4973 26.8793 20.4983V10.8503C26.8793 10.5867 26.6649 10.3727 26.4023 10.3727H23.7334V10.3733Z"
                                                    fill="currentColor"
                                                    strokeWidth="6"
                                                />
                                                <path
                                                    d="M25.0678 31.9518C23.1938 31.9518 21.6689 30.427 21.6689 28.5529C21.6689 26.6788 23.1938 25.1546 25.0678 25.1546C26.9419 25.1546 28.4662 26.6788 28.4662 28.5529C28.4662 30.427 26.9419 31.9518 25.0678 31.9518ZM25.0678 26.7414C24.0688 26.7414 23.2558 27.5538 23.2558 28.5529C23.2558 29.552 24.0688 30.3649 25.0678 30.3649C26.0669 30.3649 26.8793 29.552 26.8793 28.5529C26.8793 27.5538 26.0669 26.7414 25.0678 26.7414Z"
                                                    fill="currentColor"
                                                    strokeWidth="6"
                                                />
                                            </Icon>
                                            <span>Пожаловаться</span>
                                        </button>
                                    </div>
                                    <div>
                                        <Button
                                            type="button"
                                            className="button-reset-default-styles"
                                            onClick={handleClose}
                                            buttonColor="#E2E2E2"
                                            textColor="#000"
                                        >
                                            Скрыть
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
                <style jsx>{`
                    .action-modal {
                        position: relative;
                        z-index: 1000000;
                        width: 455px;
                        margin: 0.9em 0;
                        border-radius: 6px;
                        background-color: #fefefe;
                        box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05),
                            0px 1px 5px rgba(0, 0, 0, 0.15);
                    }

                    .action-modal__close {
                        font-size: 25px;
                    }

                    .action-modal__body {
                        padding: 24px;
                        font-size: 14px;
                        line-height: 1.5715;
                        word-wrap: break-word;
                    }

                    .action-modal__actions {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        gap: 10px;
                    }

                    .action-modal__action {
                        display: flex;
                        flex-flow: column;
                        align-items: center;
                        gap: 10px;
                        padding: 13px 16px;
                        border-radius: 6px;
                        background-color: #e2e2e2;
                        width: 33.33%;
                    }

                    .action-modal__header {
                        display: flex;
                        justify-content: space-between;
                        color: #000000d9;
                        background: #fff;
                        border-bottom: 1px solid #f0f0f0;
                        border-radius: 2px 2px 0 0;
                    }

                    .action-modal__reson {
                        padding: 10px 0;
                        font-weight: 300;
                    }

                    .action-modal__coplain-icon {
                        width: 40px;
                        height: 40px;
                        background: #e2e2e2;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .action-modal__coplain-button {
                        display: grid;
                        grid-template-columns: 10% 90%;
                        padding: 10px 0;
                        text-align: start;
                        width: 100%;
                        column-gap: 16px;
                    }

                    .action-modal__coplain-title {
                        font-size: 14px;
                        margin-bottom: 5px;
                        font-weight: 400;
                    }

                    .action-modal__coplain-location {
                        font-weight: 300;
                    }

                    .action-modal__form-title {
                        font-size: 14px;
                        margin-top: 6px;
                        font-weight: 400;
                    }

                    .action-modal__textarea {
                        width: 100%;
                        height: 70px;
                        margin: 16px 0;
                        padding: 10px;
                        border-color: gainsboro;
                        border-radius: 4px;
                    }

                    .action-modal__share-button {
                        display: flex;
                        padding: 10px 0;
                        text-align: start;
                        width: 100%;
                        column-gap: 16px;
                        align-items: center;
                    }
                `}</style>
            </div>
        </Modal>
    );
};

export default ActionModal;
