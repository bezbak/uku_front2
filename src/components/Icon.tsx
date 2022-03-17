import React, { FC, ReactNode } from "react";

interface IIconProps {
    width?: number | string;
    height?: number | string;
    name?: string;
    viewBox?: string;
    children: ReactNode;
    color?: string;
}

const Icon: FC<IIconProps> = ({
    width = 16,
    height = 16,
    name = "",
    viewBox = "0 0 50 50",
    children,
    color = "",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={viewBox}
            aria-labelledby={name}
            role="presentation"
        >
            {name && <title id={name} lang="en">{`${name} icon`}</title>}

            <g stroke={color} fill={color}>
                {children}
            </g>
        </svg>
    );
};

export default Icon;
