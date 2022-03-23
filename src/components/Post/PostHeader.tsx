import * as React from "react";

import Avatar from "../Avatar";
import CN from "classnames";
import Link from "next/link";

export interface IPostHeaderProps {
    userLink: string;
    avatar: string | null;
    first_name: string;
    last_name: string;
    location: string;
    follow: boolean;
    handleFollow?: (event: any) => void;
    headerClass?: string;
    followEnable?: boolean;
}

export default function PostHeader({
    userLink,
    avatar,
    first_name,
    last_name,
    location,
    follow,
    handleFollow,
    headerClass,
    followEnable,
}: IPostHeaderProps) {
    return (
        <header className={CN("post-card__header", headerClass)}>
            <Link href={`/profile/${userLink}`}>
                <div className="post-card__header-left">
                    <Avatar url={avatar} name={first_name} />
                    <div>
                        <h3 className="post-card__header-title">
                            {first_name} {last_name}
                        </h3>
                        <p className="post-card__header-location">{location}</p>
                    </div>
                </div>
            </Link>

            {followEnable && (
                <div className="post-card__header-right">
                    <button
                        type="button"
                        className={CN(
                            "post-card__button button-reset-default-styles",
                            {
                                "post-card__button--follow": !follow,
                            }
                        )}
                        onClick={(event) => {
                            if (handleFollow) handleFollow(event);
                        }}
                    >
                        {follow ? "Вы подписаны" : "Подписаться"}
                    </button>
                </div>
            )}
            <style jsx>{`
                .post-card__header {
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border: 1px solid #dfdfdf;
                    border-radius: 6px 6px 0px 0px;
                }

                .post-card__header-left {
                    display: flex;
                    column-gap: 8px;
                    font-size: 4px;
                }

                .post-card__header-title {
                    font-weight: normal;
                    font-size: 14px;
                    margin-bottom: 4px;
                }

                .post-card__header-location {
                    font-size: 12px;
                    color: #a0a0a0;
                }

                .post-card__button--follow {
                    color: #e56366;
                }
            `}</style>
        </header>
    );
}
