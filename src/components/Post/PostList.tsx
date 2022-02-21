import * as React from "react";
import CN from "classnames";

export interface IPostListProps {
    children: React.ReactNode;
    massonry?: boolean;
}

export default function PostList({
    children,
    massonry = false,
}: IPostListProps) {
    return (
        <div
            className={CN("post-list", {
                "post-list--masonry": massonry,
            })}
        >
            {children}
            <style jsx>
                {`
                    .post-list {
                        display: grid;
                        grid-template-columns: repeat(
                            auto-fill,
                            minmax(300px, 1fr)
                        );
                        grid-gap: 16px;
                    }
                `}
            </style>
        </div>
    );
}
