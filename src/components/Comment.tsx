import React, { useState } from "react";

import Avatar from "./Avatar";
import { IComment } from "@/services/types";
import Link from "next/link";

export interface ICommentProps {
    comment: IComment;
    setAnswer: (data: { id: number; user: string }) => void;
}

export default function Comment({ comment, setAnswer }: ICommentProps) {
    const [show, setShow] = useState(false);
    return (
        <div className="comment">
            <Avatar
                name={comment.author.first_name}
                url={comment.author.avatar}
                placholder={true}
            />
            <div className="comment__content">
                <p className="comment__text">
                    <Link href={`/profile/${comment.author.id}`}>
                        <a className="comment__author">
                            {comment.author.first_name}{" "}
                            {comment.author.last_name}
                        </a>
                    </Link>{" "}
                    {comment.text}
                </p>
                {comment.image ? (
                    <img src={comment.image} alt="#" className="comment__img" />
                ) : null}
                <div className="comment__action">
                    <span className="comment__created">
                        {comment.created_at}
                    </span>
                    {!!comment.replies && (
                        <button
                            className="comment__answer button-reset-default-styles"
                            onClick={() =>
                                setAnswer({
                                    id: comment.id,
                                    user: `@${comment.author.first_name}_${comment.author.last_name}`,
                                })
                            }
                        >
                            Ответить
                        </button>
                    )}
                </div>
                {show &&
                    !!comment.replies &&
                    (comment.replies as IComment[]).map((comment) => (
                        <Comment
                            comment={comment}
                            key={comment.id}
                            setAnswer={setAnswer}
                        />
                    ))}
                {!!comment.replies && comment.replies.length > 0 && (
                    <button
                        type="button"
                        className="comment__more button-reset-default-styles"
                        onClick={() => setShow(!show)}
                    >
                        ---{" "}
                        {show
                            ? "Скрыть коментарии"
                            : `Показать ${comment.replies.length} коментариев`}
                    </button>
                )}
            </div>
            <style jsx>{`
                .comment {
                    display: flex;
                    align-items: self-start;
                    margin-top: 10px;
                    column-gap: 8px;
                }
                .comment__text {
                    font-size: 14px;
                    margin-bottom: 6px;
                }

                .comment__author {
                    text-decoration: none;
                    color: #091a2e;
                    text-transform: capitalize;
                    font-weight: 600;
                }

                .comment__created {
                    font-size: 14px;
                    color: #a5a5a5;
                    margin-right: 32px;
                }

                .comment__answer {
                    font-size: 14px;
                    color: #a5a5a5;
                }

                .comment__more {
                    font-size: 14px;
                    color: #a5a5a5;
                    margin-top: 10px;
                }

                .comment__img {
                    width: 100%;
                }
            `}</style>
        </div>
    );
}
