import React from "react";

export function PostCardSkeleton() {
    return (
        <>
            <article className="post-card-skelet">
                <div className="post-card-skelet__wrapper">
                    <div className="post-card-skelet__header">
                        <div className="post-card-skelet__header-right">
                            <span className="post-card-skelet__avatar post-card-skelet__element" />
                            <div
                                style={{
                                    width: "70%",
                                }}
                            >
                                <h3 className="post-card-skelet__title post-card-skelet__element"></h3>
                                <p className="post-card-skelet__location post-card-skelet__element"></p>
                            </div>
                        </div>
                        <div
                            className="post-card-skelet__header__left"
                            style={{
                                width: "50%",
                            }}
                        >
                            <p className="post-card-skelet__sub post-card-skelet__element"></p>
                        </div>
                    </div>
                    <div className="post-card-skelet__body">
                        <div className="post-card-skelet__img post-card-skelet__element"></div>
                        <div className="post-card-skelet__content">
                            <div className="post-card-skelet__dots">
                                {[1, 2, 3, 4, 5].map((_, index) => (
                                    <span
                                        className="post-card-skelet__element"
                                        key={index}
                                    />
                                ))}
                            </div>
                            <span className="post-card-skelet__element post-card-skelet__category"></span>
                            <span className="post-card-skelet__element post-card-skelet__name"></span>
                            <span className="post-card-skelet__element post-card-skelet__comment"></span>
                            <div className="post-card-skelet__footer">
                                <span className="post-card-skelet__element post-card-skelet__time"></span>
                                <p className="post-card-skelet__view post-card-skelet__element"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <style jsx>
                {`
                    .post-card-skelet {
                        width: 370px;
                    }

                    .post-card-skelet__element {
                        animation: gw-skeleton-loading 1.4s ease infinite;
                        background: linear-gradient(
                            90deg,
                            rgba(190, 190, 190, 0.2) 25%,
                            rgba(129, 129, 129, 0.24) 37%,
                            rgba(190, 190, 190, 0.2) 63%
                        );
                        background-size: 400% 100%;
                        display: block;
                    }

                    .post-card-skelet__header {
                        padding: 12px 16px;
                        display: flex;
                        align-items: center;
                        border: 1px solid #dfdfdf;
                        border-radius: 6px 6px 0px 0px;
                    }

                    .post-card-skelet__header-right {
                        display: flex;
                        column-gap: 8px;
                        font-size: 4px;
                        width: 70%;
                    }

                    .post-card-skelet__avatar {
                        display: inline-block;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                    }

                    .post-card-skelet__title {
                        width: 70%;
                        height: 13px;
                        border-radius: 4px;
                    }

                    .post-card-skelet__location {
                        margin-top: 10px;
                        width: 50%;
                        height: 10px;
                        border-radius: 4px;
                    }

                    .post-card-skelet__sub {
                        width: 60%;
                        margin-left: auto;
                        height: 10px;
                        border-radius: 4px;
                    }

                    .post-card-skelet__img {
                        width: 100%;
                        height: 190px;
                    }

                    .post-card-skelet__content {
                        padding: 5px 16px 20px;
                        border: 1px solid #dfdfdf;
                        border-radius: 0px 0px 6px 6px;
                    }

                    .post-card-skelet__dots {
                        height: 4px;
                        display: grid;
                        column-gap: 6px;
                        grid-template-columns: repeat(5, 1fr);
                        margin-bottom: 6px;
                    }

                    .post-card-skelet__category {
                        height: 10px;
                        border-radius: 4px;
                        width: 50%;
                    }

                    .post-card-skelet__name {
                        height: 30px;
                        border-radius: 4px;
                        width: 100%;
                        margin-top: 8px;
                    }

                    .post-card-skelet__comment {
                        height: 10px;
                        border-radius: 4px;
                        width: 70%;
                        margin-top: 12px;
                    }

                    .post-card-skelet__footer {
                        display: flex;
                        margin-top: 15px;
                        justify-content: space-between;
                    }

                    .post-card-skelet__time {
                        width: 30%;
                        height: 10px;
                    }

                    .post-card-skelet__view {
                        width: 20%;
                        height: 10px;
                    }

                    @keyframes gw-skeleton-loading {
                        0% {
                            background-position: 100% 50%;
                        }

                        to {
                            background-position: 0 50%;
                        }
                    }
                `}
            </style>
        </>
    );
}
