import Comment from "../Comment";
import { IPublication } from "@/services/types";
import Icon from "../Icon";
import PostHeader from "./PostHeader";
import React from "react";

export default function Post({ post }: { post: IPublication }) {
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
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </div>
                    <footer className="post-view__footer">
                        <form className="post-view__form">
                            <div className="post-view__text">
                                <label className="post-view__text-label">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        className="hide-elements"
                                    />
                                    <Icon width={22} height={19}>
                                        <path
                                            d="M23.2822 18.6117C20.8035 18.6117 18.7939 20.6211 18.7939 23.0999C18.7939 25.5787 20.8034 27.5882 23.2822 27.5882C25.7609 27.5882 27.7704 25.5788 27.7704 23.0999C27.7704 20.6211 25.761 18.6117 23.2822 18.6117ZM23.2822 25.4508C21.9838 25.4508 20.9312 24.3983 20.9312 23.0998C20.9312 21.8014 21.9838 20.7489 23.2822 20.7489C24.5806 20.7489 25.6332 21.8014 25.6332 23.0998C25.6332 24.3983 24.5806 25.4508 23.2822 25.4508Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M41.1817 8.35256L12.0083 5.03991C10.8761 4.87894 9.7289 5.20948 8.85592 5.94828C7.98304 6.62511 7.42352 7.62838 7.30642 8.72666L6.77216 13.108H5.11568C2.76469 13.108 1.00144 15.1918 1.00144 17.5428V39.396C0.942229 41.6379 2.71161 43.5034 4.95358 43.5626C5.00758 43.5641 5.06168 43.5644 5.11568 43.5637H34.4493C36.8003 43.5637 38.9376 41.747 38.9376 39.396V38.5412C39.6664 38.4003 40.3579 38.1092 40.9679 37.6863C41.8337 36.9574 42.388 35.9252 42.5174 34.801L44.9753 13.108C45.2259 10.7516 43.5348 8.63186 41.1817 8.35256ZM36.8003 39.396C36.8003 40.5715 35.6248 41.4264 34.4493 41.4264H5.11568C4.05381 41.4576 3.16774 40.6221 3.13654 39.5602C3.13491 39.5055 3.13562 39.4507 3.13869 39.396V35.4422L11.4206 29.351C12.4154 28.5872 13.8168 28.6551 14.7333 29.5113L20.5573 34.6407C21.4417 35.3832 22.5551 35.7984 23.7098 35.8162C24.6126 35.8272 25.5006 35.5868 26.2745 35.1215L36.8004 29.0304V39.396H36.8003ZM36.8003 26.5192L25.1523 33.3049C24.1521 33.8975 22.8861 33.7902 21.9998 33.0378L16.1224 27.8549C14.4379 26.4075 11.9759 26.3187 10.1916 27.6412L3.13869 32.7705V17.5428C3.13869 16.3673 3.94019 15.2453 5.11568 15.2453H34.4493C35.7052 15.2973 36.7194 16.2885 36.8003 17.5428V26.5192V26.5192ZM42.8401 12.8195C42.8394 12.8266 42.8388 12.8337 42.8379 12.8408L40.3267 34.5338C40.331 35.0963 40.0745 35.629 39.6321 35.9764C39.4183 36.1902 38.9375 36.297 38.9375 36.4039V17.5428C38.8531 15.1086 36.8842 13.1632 34.4492 13.108H8.9093L9.39018 8.94041C9.4945 8.40073 9.77666 7.91167 10.1917 7.55116C10.6603 7.22717 11.2269 7.07612 11.7947 7.12367L40.9146 10.4898C42.0895 10.6014 42.9517 11.6444 42.8401 12.8195Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M48.5 38.4779C48.5 42.9084 44.9084 46.5 40.4779 46.5C36.0474 46.5 32.4558 42.9084 32.4558 38.4779C32.4558 34.0475 36.0474 30.4558 40.4779 30.4558C44.9084 30.4558 48.5 34.0475 48.5 38.4779Z"
                                            fill="white"
                                            stroke="currentColor"
                                        />
                                        <path
                                            d="M44.2836 37.8067H41.1496V34.6727C41.1496 34.4827 41.0741 34.3005 40.9398 34.1662C40.8054 34.0318 40.6232 33.9563 40.4332 33.9563C40.2433 33.9563 40.0611 34.0318 39.9267 34.1662C39.7924 34.3005 39.7169 34.4827 39.7169 34.6727V37.8067H36.6724C36.4824 37.8067 36.3002 37.8822 36.1659 38.0165C36.0315 38.1509 35.9561 38.3331 35.9561 38.5231C35.9561 38.7131 36.0315 38.8953 36.1659 39.0296C36.3002 39.164 36.4824 39.2394 36.6724 39.2394H39.7169V42.2839C39.7169 42.4739 39.7924 42.6561 39.9267 42.7905C40.0611 42.9248 40.2433 43.0003 40.4332 43.0003C40.6232 43.0003 40.8054 42.9248 40.9398 42.7905C41.0741 42.6561 41.1496 42.4739 41.1496 42.2839V39.2394H44.2836C44.4736 39.2394 44.6558 39.164 44.7902 39.0296C44.9245 38.8953 45 38.7131 45 38.5231C45 38.3331 44.9245 38.1509 44.7902 38.0165C44.6558 37.8822 44.4736 37.8067 44.2836 37.8067Z"
                                            fill="currentColor"
                                        />
                                    </Icon>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ваш коментарий"
                                    className="post-view__input"
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
