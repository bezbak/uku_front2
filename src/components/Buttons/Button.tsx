import { FC, ReactNode } from "react";

import CN from "classnames";
import React from "react";
import Spinner from "../Spinner";

interface ButtonProps {
    type: "button" | "submit";
    outline?: boolean;
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    disable?: boolean;
    buttonColor?: string;
    textColor?: string;
    loading?: boolean;
    fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
    type = "button",
    outline = false,
    children,
    onClick,
    className,
    disable = false,
    buttonColor = "#e56366",
    textColor = "#fff",
    loading = false,
    fullWidth = true,
}) => {
    return (
        <button
            type={type}
            className={CN(
                "button",
                {
                    "button--outline": outline,
                    "button--disable": disable,
                    "button--loading": loading,
                    "button--full-width": fullWidth,
                },
                className
            )}
            onClick={onClick}
            disabled={disable || loading}
        >
            {loading ? <Spinner /> : children}
            <style jsx>{`
                .button {
                    padding: 13px 16px;
                    border-radius: 6px;
                    background-color: ${buttonColor};
                    color: ${textColor};
                    border: none;
                    cursor: pointer;
                }

                .button--full-width {
                    width: 100%;
                }

                .button--loading {
                    padding: 10px 16px;
                }

                .button--outline {
                    border: 1px solid ${buttonColor};
                    background: transparent;
                    color: ${buttonColor};
                }

                .button--disable {
                    opacity: 0.5;
                }
            `}</style>
        </button>
    );
};

export default Button;
