import React, { FC } from "react";

import Button from "../Buttons/Button";
import Modal from "../Modal/Modal";

interface IConfirmAlertProps {
    open: boolean;
    title: string;
    confirmText: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const ConfirmAlert: FC<IConfirmAlertProps> = ({
    open,
    title,
    onCancel,
    onConfirm,
    confirmText,
}) => {
    return (
        <Modal open={open}>
            <div className="confirm-alert">
                <div className="confirm-alert__body">
                    <h2 className="confirm-alert__title">{title}</h2>
                    <div className="confirm-alert__buttons">
                        <Button type="button" onClick={onConfirm}>
                            {confirmText}
                        </Button>
                        <Button type="button" outline={true} onClick={onCancel}>
                            Отмена
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

export default ConfirmAlert;
