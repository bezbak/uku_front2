import React, { FC, ReactNode, useEffect } from "react";

import CN from "classnames";
import Scrollable from "../Scrollable";

export interface IModalProps {
    open: boolean;
    children: ReactNode;
}

const ModalBackdrop = () => {
    return (
        <>
            <div className="modal-backdrop" />
            <style jsx>
                {`
                    .modal-backdrop {
                        display: block;
                        position: fixed;
                        right: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0.75;
                        background-color: #000;
                    }
                `}
            </style>
        </>
    );
};

const Modal: FC<IModalProps> = ({ open, children }) => {
    useEffect(() => {
        if (open) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [open]);

    return (
        <div
            className={CN("modal", {
                "modal--open": open,
            })}
        >
            <ModalBackdrop />
            <Scrollable _className="modal_scroll">{children}</Scrollable>
            <style jsx global>{`
                body.modal-open {
                    overflow: hidden;
                }
                .modal {
                    display: none;
                    position: fixed;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow-x: hidden;
                    overflow-y: auto;
                    outline: 0;
                }

                .modal.modal--open {
                    display: block;
                }

                .modal .modal_scroll {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </div>
    );
};
export default Modal;
