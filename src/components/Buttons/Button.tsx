import { FC, ReactNode } from "react";

import CN from "classnames";
import React from "react";

interface ButtonProps {
    type: "button" | "submit";
    outline?: boolean;
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    disable?: boolean;
    buttonColor?: string;
    textColor?: string;
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
}) => {
    return (
        <button
            type={type}
            className={CN(
                "button",
                {
                    "button--outline": outline,
                    "button--disable": disable,
                },
                className
            )}
            onClick={onClick}
            disabled={disable}
        >
            {children}
            <style jsx>{`
                .button {
                    width: 100%;
                    padding: 13px 16px;
                    border-radius: 6px;
                    background-color: ${buttonColor};
                    color: ${textColor};
                    border: none;
                    cursor: pointer;
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
