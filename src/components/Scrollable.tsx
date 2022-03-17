import React, { FC, ReactNode } from "react";

import CN from "classnames";

interface IScrollableProps {
    children: ReactNode;
    _className?: string;
}

const Scrollable: FC<IScrollableProps> = ({ children, _className }) => {
    return (
        <>
            <div className={CN("scrollable", _className)}>{children}</div>
            <style jsx>
                {`
                    .scrollable {
                        height: 100%;
                        overflow-y: scroll;
                        -ms-overflow-style: none; /* for Internet Explorer, Edge */
                        scrollbar-width: none; /* for Firefox */
                    }
                    .scrollable::-webkit-scrollbar {
                        display: none; /* for Chrome, Safari, and Opera */
                    }
                `}
            </style>
        </>
    );
};

export default Scrollable;
