import * as React from "react";
import Icon from "./Icon";

export interface IAvatarProps {
    name: string;
    url?: string | null;
    width?: number;
    height?: number;
    placholder?: boolean;
    randomColor?: boolean;
}

export default function Avatar({
    name,
    url = null,
    height = 32,
    width = 32,
    placholder = false,
    randomColor = true,
}: IAvatarProps) {
    const stringToHslColor = (str: string) => {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var h = hash % 360;
        return "hsl(" + h + ", " + 30 + "%, " + 80 + "%)";
    };

    return (
        <div className="gw-avatar">
            <div className="gw-avatar__image">
                {placholder ? (
                    <Icon width={13} height={13}>
                        <path
                            d="M25 29.8C38.2544 29.8 49 34.8144 49 41V49H1V41C1 34.8144 11.7456 29.8 25 29.8ZM45.8 41C45.8 36.584 36.488 33 25 33C13.512 33 4.2 36.584 4.2 41V45.8H45.8V41ZM25 1C27.9704 1 30.8192 2.18 32.9196 4.2804C35.02 6.38081 36.2 9.22958 36.2 12.2C36.2 15.1704 35.02 18.0192 32.9196 20.1196C30.8192 22.22 27.9704 23.4 25 23.4C22.0296 23.4 19.1808 22.22 17.0804 20.1196C14.98 18.0192 13.8 15.1704 13.8 12.2C13.8 9.22958 14.98 6.38081 17.0804 4.2804C19.1808 2.18 22.0296 1 25 1ZM25 4.2C22.8783 4.2 20.8434 5.04285 19.3431 6.54315C17.8429 8.04344 17 10.0783 17 12.2C17 14.3217 17.8429 16.3566 19.3431 17.8569C20.8434 19.3571 22.8783 20.2 25 20.2C27.1217 20.2 29.1566 19.3571 30.6569 17.8569C32.1571 16.3566 33 14.3217 33 12.2C33 10.0783 32.1571 8.04344 30.6569 6.54315C29.1566 5.04285 27.1217 4.2 25 4.2V4.2Z"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="0.260099"
                        />
                    </Icon>
                ) : !url ? (
                    name.charAt(0).toUpperCase()
                ) : (
                    <img src={url} alt="" />
                )}
            </div>
            <slot />
            <style jsx>
                {`
                    .gw-avatar {
                        display: flex;
                        position: relative;
                        align-items: center;
                        justify-content: center;
                    }
                    .gw-avatar__image {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: ${width}px;
                        height: ${height}px;
                        border-radius: 50px;
                        background-color: ${randomColor
                            ? stringToHslColor(name)
                            : "#eceaea"};
                        color: #fff;
                        text-align: center;
                    }
                `}
            </style>
        </div>
    );
}
