import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { commentAsync, publicationAsync } from "./PostSlice";

import AddImageIcon from "../icons/AddImageIcon";
import CN from "classnames";
import Comment from "../Comment";
import { IPublication } from "@/services/types";
import Icon from "../Icon";
import PostHeader from "./PostHeader";
import { useAppDispatch } from "@/app/hooks";

export default function Post({ post }: { post: IPublication }) {
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<string | null>(null);
    const [answer, setAnswer] = useState<{ id: number; user: string } | null>(
        null
    );
    const [comment, setComment] = useState("");
    const inputEl = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const reset = () => {
        setAnswer(null);
        setComment("");
        formRef.current?.reset();
        setImage(null);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append("id", `${post.id}`);
        await dispatch(
            commentAsync({
                comment_id: answer?.id,
                id: post.id,
                formData,
            })
        );
        reset();
        if (answer?.id) dispatch(publicationAsync(post.id));
    };

    const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            setImage(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (answer) setComment(answer.user);
        inputEl.current?.focus();
    }, [answer]);
    return (
        <>
            <div className="post-view">
                <div className="post-view__left">
                    <div className="post-view__left-inner">
                        <PostHeader
                            userLink={`${post.user.id}`}
                            avatar={post.user.avatar}
                            first_name={post.user.first_name}
                            follow={false}
                            last_name={post.user.last_name}
                            location={post.location.name}
                            handleFollow={() => console.log("tts")}
                            headerClass="post-view__header"
                        />
                        <div className="post-view__image-wrap">
                            {post.images[0]?.image ? (
                                <img
                                    src={post.images[0]?.image}
                                    alt=""
                                    className="post-view__image"
                                />
                            ) : (
                                <img
                                    src="/images/noImage.png"
                                    className="post-view__image"
                                    alt=""
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="post-view__right">
                    <p className="post-view__category">{post.category.name}</p>
                    <div>
                        <h4 className="post-view__title">{post.title}</h4>
                        <p className="post-view__desc">{post.description}</p>
                    </div>
                    <div className="post-view__comments">
                        <h4 className="post-view__title">
                            Комментарии ({post.comments.length})
                        </h4>
                        <div className="post-view__comments-inner">
                            {post.comments?.map((comment) => (
                                <Comment
                                    key={comment.id}
                                    comment={comment}
                                    setAnswer={setAnswer}
                                />
                            ))}
                        </div>
                    </div>
                    <footer className="post-view__footer">
                        <form
                            className="post-view__form"
                            onSubmit={handleSubmit}
                            ref={formRef}
                        >
                            <div className="post-view__text">
                                <label className="post-view__text-label">
                                    {!!image && (
                                        <img
                                            src={image}
                                            alt=""
                                            className="post-view__image-view"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        className="hide-elements"
                                        name="image"
                                        onChange={(event) => handleImage(event)}
                                    />
                                    <div
                                        className={CN(
                                            "post-view__image-input",
                                            {
                                                "post-view__image-input--hide":
                                                    image,
                                            }
                                        )}
                                    >
                                        <Icon width={22} height={19}>
                                            <AddImageIcon />
                                        </Icon>
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ваш коментарий"
                                    className="post-view__input"
                                    name="text"
                                    ref={inputEl}
                                    onChange={(event) =>
                                        setComment(event.currentTarget.value)
                                    }
                                    value={comment}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="button-reset-default-styles post-view__button"
                            >
                                <Icon width={24} height={20}>
                                    <path
                                        d="M46.1414 20.6586L7.41385 4.36274C5.78232 3.67614 3.93919 3.97818 2.60363 5.15059C1.26807 6.32318 0.709509 8.1298 1.14601 9.86559L4.95169 25L1.14601 40.1344C0.709509 41.8702 1.26798 43.6768 2.60354 44.8494C3.94163 46.0243 5.78522 46.3225 7.41385 45.6373L46.1414 29.3414C47.9046 28.5994 49 26.9359 49 25C49 23.0641 47.9046 21.4005 46.1414 20.6586ZM45.0633 26.707L6.33591 43.0029C5.68463 43.2768 4.97766 43.1611 4.44451 42.693C3.91144 42.225 3.69723 41.532 3.87141 40.8391L7.49569 26.426H21.4705C22.2472 26.426 22.8769 25.7876 22.8769 24.9999C22.8769 24.2122 22.2472 23.5738 21.4705 23.5738H7.49578L3.87141 9.16093C3.69723 8.46806 3.91144 7.775 4.44451 7.30697C4.97757 6.83894 5.68435 6.72314 6.33582 6.99713L45.0633 23.293C46.1063 23.7319 46.1874 24.7105 46.1874 25C46.1874 25.2895 46.1063 26.2681 45.0633 26.707Z"
                                        fill="currentColor"
                                    />
                                </Icon>
                            </button>
                        </form>
                    </footer>
                </div>
            </div>
            <style jsx>{`
                .post-view {
                    display: flex;
                    column-gap: 24px;
                    border: 1px solid #dfdfdf;
                    border-radius: 6px;
                }

                .post-view__left {
                    width: 50%;
                    position: relative;
                }

                .post-view__left-inner {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                }

                .post-view__right {
                    width: 50%;
                    padding: 16px;
                    padding-left: 0;
                }

                .post-view__image-wrap {
                    height: 100%;
                }

                .post-view__image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .post-view__category {
                    font-size: 14px;
                    color: #818181;
                    margin-bottom: 24px;
                }

                .post-view__title {
                    font-weight: 500;
                    font-size: 24px;
                    line-height: 29px;
                    margin-bottom: 12px;
                }

                .post-view__desc {
                    margin-bottom: 24px;
                }

                .post-view__comments-inner {
                    height: 250px;
                    overflow: scroll;
                    padding-bottom: 10px;
                }

                .post-view__footer {
                    padding: 16px 0 0;
                    border-top: 1px solid #e9e9e9;
                }

                .post-view__form {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #c5c5c5;
                }

                .post-view__text {
                    display: flex;
                    align-items: center;
                    column-gap: 14px;
                    width: 100%;
                }

                .post-view__button {
                    color: #c5c5c5;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #d9d9d9;
                    border-radius: 44px;
                }

                .post-view__text-label {
                    font-size: 0;
                    cursor: pointer;
                }

                .post-view__input {
                    width: 100%;
                    padding: 10px;
                    border: 0;
                    outline: none;
                }

                .post-view__image-input--hide {
                    display: none;
                }

                .post-view__image-view {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                }

                @media all and (max-width: 900px) {
                    .post-view {
                        position: relative;
                        flex-wrap: wrap;
                    }
                    .post-view__left {
                        width: 100%;
                    }
                    .post-view__left-inner {
                        position: initial;
                    }
                    .post-view__right {
                        width: 100%;
                        padding-left: 16px;
                    }
                    .post-view__footer {
                        position: absolute;
                        width: 100%;
                        left: 0;
                        padding: 20px;
                        bottom: 0;
                        background: #fff;
                    }
                    .post-view__comments-inner {
                        margin-bottom: 80px;
                        min-height: 250px;
                        height: auto;
                    }
                }

                @media all and (max-width: 500px) {
                    .post-view__title {
                        font-size: 16px;
                        line-height: 150%;
                    }
                    .post-view__desc {
                        font-size: 14px;
                        line-height: 175%;
                        color: #525252;
                    }
                    .post-view__title {
                        font-size: 14px;
                    }
                }
            `}</style>
            <style jsx global>{`
                .post-view .post-view__header {
                    border-top: 0;
                    border-radius: 0;
                    border-left: 0;
                }
            `}</style>
        </>
    );
}
