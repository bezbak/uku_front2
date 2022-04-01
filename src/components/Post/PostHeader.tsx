import * as React from "react";

import Actions from "../Actions";
import Avatar from "../Avatar";
import CN from "classnames";
import Link from "next/link";
import { setActionModal } from "@/app/mainSlice";
import { useAppDispatch } from "@/app/hooks";

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
    isOwner?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    postId: number;
}

export default function PostHeader({
    postId,
    userLink,
    avatar,
    first_name,
    last_name,
    location,
    follow,
    handleFollow,
    headerClass,
    followEnable,
    isOwner,
    onEdit,
    onDelete,
}: IPostHeaderProps) {
    const [actions, setActions] = React.useState(false);
    const dispatch = useAppDispatch();

    const handleAction = (action: string) => {
        if (action === "edit") {
            if (onEdit) onEdit();
        } else if (action === "delete") {
            if (onDelete) onDelete();
        }
        setActions(false);
    };

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

            <div className="post-card__header-right">
                {followEnable && (
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
                )}
                <div className="">
                    <button
                        className="post-card__header-button button-reset-default-styles"
                        onClick={(event) => {
                            event.stopPropagation();
                            dispatch(setActionModal(postId));
                        }}
                    >
                        <span className="post-card__header-dot"></span>
                        <span className="post-card__header-dot"></span>
                        <span className="post-card__header-dot"></span>
                    </button>
                </div>
            </div>

            {isOwner && (
                <div className="post-card__header-actions">
                    <button
                        className="post-card__header-button button-reset-default-styles"
                        onClick={() => setActions(!actions)}
                    >
                        <span className="post-card__header-dot"></span>
                        <span className="post-card__header-dot"></span>
                        <span className="post-card__header-dot"></span>
                    </button>
                    <Actions
                        actions={[
                            {
                                name: "edit",
                                text: "Редактировать",
                            },
                            {
                                name: "delete",
                                text: "Удалить",
                            },
                        ]}
                        open={actions}
                        onAction={handleAction}
                    />
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
                    position: relative;
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
                    padding: 10px;
                }

                .post-card__header-actions {
                    display: none;
                }

                .post-card__header-dot {
                    height: 4px;
                    width: 4px;
                    background-color: #000;
                    border-radius: 50%;
                    display: block;
                    margin-bottom: 2px;
                }

                .post-card__header-button {
                    padding: 10px;
                }

                .post-card__header-right {
                    display: flex;
                    align-items: center;
                }

                @media all and (max-width: 470px) {
                    .post-card__header-actions {
                        display: block;
                    }
                }
            `}</style>
        </header>
    );
}
