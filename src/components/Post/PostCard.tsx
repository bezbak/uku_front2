import { IProfileFeedItem } from "@/services/types";
import * as React from "react";
import Avatar from "../Avatar";
import CN from "classnames";
import Icon from "../Icon";
import ViewedIcon from "../icons/ViewedIcon";

export interface IPostCardProps {
    item: IProfileFeedItem;
}

export default function PostCard({ item }: IPostCardProps) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return (
        <article className="post-card">
            <header className="post-card__header">
                <div className="post-card__header-left">
                    <Avatar
                        url={item.user.avatar}
                        name={item.user.first_name}
                    />
                    <div>
                        <h3 className="post-card__header-title">
                            {item.user.first_name} {item.user.last_name}
                        </h3>
                        <p className="post-card__header-location">
                            {item.user.location}
                        </p>
                    </div>
                </div>
                <div className="post-card__header-right">
                    <button
                        type="button"
                        className={CN(
                            "post-card__button button-reset-default-styles",
                            {
                                "post-card__button--follow":
                                    !item.user.following,
                            }
                        )}
                    >
                        {item.user.following ? "Вы подписаны" : "Подписаться"}
                    </button>
                </div>
            </header>
            <section
                className={CN("post-card__body", {
                    "post-card__body--no-image": !item.images.length,
                })}
            >
                {item.images.length > 0 && (
                    <div className="post-card__images">
                        <img
                            src={item.images[selectedIndex]?.image}
                            className="post-card__image"
                            alt=""
                        />
                    </div>
                )}
                <div className="post-card__content">
                    {item.images.length > 0 && (
                        <div className="post-card__dots">
                            {item.images.map((_, index) => (
                                <button
                                    type="button"
                                    className={CN(
                                        "post-card__dot button-reset-default-styles",
                                        {
                                            "post-card__dot--active":
                                                index === selectedIndex,
                                        }
                                    )}
                                    onClick={() => setSelectedIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                    <p className="post-card__categories">{item.categories}</p>
                    <h4 className="post-card__title">{item.title}</h4>
                    <button className="button-reset-default-styles post-card__comments">
                        Посмотреть все комментарии ({item.comment_count})
                    </button>
                    <footer className="post-card__footer">
                        <span className="post-card__create-at">
                            {item.created_at}
                        </span>
                        <div>
                            <Icon width={18} height={12}>
                                <ViewedIcon />
                            </Icon>
                            <span>{item.viewed}</span>
                        </div>
                    </footer>
                </div>
            </section>
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

                .post-card__image {
                    width: 100%;
                }

                .post-card__content {
                    padding: 5px 16px 20px;
                    border: 1px solid #dfdfdf;
                    border-radius: 0px 0px 6px 6px;
                }

                .post-card__categories {
                    font-size: 13px;
                    color: #818181;
                    margin-bottom: 8px;
                }

                .post-card__title {
                    font-weight: normal;
                    font-size: 14px;
                    margin-bottom: 12px;
                }

                .post-card__comments {
                    font-family: Inter;
                    font-size: 14px;
                    color: #a5a5a5;
                }

                .post-card__body--no-image {
                    margin-top: 4px;
                }

                .post-card__footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 15px;
                    font-size: 14px;
                    color: #a5a5a5;
                }

                .post-card__dots {
                    height: 4px;
                    display: grid;
                    column-gap: 6px;
                    grid-template-columns: repeat(${item.images.length}, 1fr);
                    margin-bottom: 6px;
                }

                .post-card__dot {
                    background: #eaeaea;
                    border-radius: 4px;
                }

                .post-card__dot--active {
                    background: #e56366;
                }
            `}</style>
        </article>
    );
}
