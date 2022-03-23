import { selectAuthConfrim, setAuthConfirm } from "@/app/mainSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";
import React from "react";
import { useRouter } from "next/router";

const AuthConfirm = () => {
    const open = useAppSelector(selectAuthConfrim);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onCancel = () => {
        dispatch(setAuthConfirm(false));
    };

    const onConfirm = () => {
        router.push("/login");
        dispatch(setAuthConfirm(false));
    };

    return (
        <Modal open={open}>
            <div className="confirm-alert">
                <div className="confirm-alert__body">
                    <h2 className="confirm-alert__title">
                        Вы еще не авторизованы
                    </h2>
                    <div className="confirm-alert__buttons">
                        <Button type="button" outline={true} onClick={onCancel}>
                            Отмена
                        </Button>
                        <Button type="button" onClick={onConfirm}>
                            Авторизоваться
                        </Button>
                    </div>
                </div>
                <style jsx>{`
                    .confirm-alert {
                        position: relative;
                        z-index: 2;
                        width: 390px;
                        margin: 0.9em 0;
                        border-radius: 6px;
                        background-color: #fefefe;
                        box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05),
                            0px 1px 5px rgba(0, 0, 0, 0.15);
                    }

                    .confirm-alert__body {
                        padding: 24px;
                        font-size: 14px;
                        line-height: 1.5715;
                        word-wrap: break-word;
                    }

                    .confirm-alert__title {
                        font-weight: 500;
                        font-size: 18px;
                    }

                    .confirm-alert__buttons {
                        display: flex;
                        column-gap: 12px;
                        margin-top: 24px;
                    }
                `}</style>
            </div>
        </Modal>
    );
};

export default AuthConfirm;
