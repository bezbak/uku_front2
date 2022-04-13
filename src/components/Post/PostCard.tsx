import React, { useEffect, useState } from "react";
import { faveAsync, followAsync } from "./PostSlice";

import CN from "classnames";
import EditIcon from "../icons/EditIcon";
import { IProfileFeedItem } from "@/services/types";
import Icon from "../Icon";
import Link from "next/link";
import PostHeader from "./PostHeader";
import ViewedIcon from "../icons/ViewedIcon";
import { setAuthConfirm } from "@/app/mainSlice";
import { useAppDispatch } from "@/app/hooks";
import { useGetToken } from "@/hooks/useGetToken";

export interface IPostCardProps {
    item: IProfileFeedItem;
    onFollow?: () => void;
    onFave?: () => void;
    onDelete?: (id: number) => void;
    onLoad?: () => void;
    faveEneble?: boolean;
    followEnable?: boolean;
    header?: boolean;
    masonry?: boolean;
    width?: number;
}

export default function PostCard({
    item,
    onFollow,
    onFave,
    onDelete,
    onLoad,
    faveEneble = true,
    followEnable = true,
    header = true,
    masonry = false,
}: IPostCardProps) {
    const dispatch = useAppDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [follow, setFollow] = useState(item.user?.following);
    const [inFave, setInFave] = useState(item.is_favorite);

    const auth = useGetToken();
    const handleFollow = async (event: any) => {
        event.preventDefault();
        if (auth && item.user) {
            const { payload } = await dispatch(followAsync(item.user.id));
            setFollow((payload as any).subscribe);
            if (onFollow) onFollow();
        } else {
            dispatch(setAuthConfirm(true));
        }
    };

    const handleFave = async (event: any) => {
        event.preventDefault();
        if (auth) {
            await dispatch(faveAsync(item.id));
            setInFave(!inFave);
            if (onFave) onFave();
        } else {
            dispatch(setAuthConfirm(true));
        }
    };

    const handleDelete = (event: any) => {
        event.preventDefault();
        if (onDelete) onDelete(item.id);
    };

    const handleLoad = () => {
        if (onLoad) onLoad();
    };

    useEffect(() => {
        if (!followEnable) setFollow(item.user?.following);
    }, [item]);

    return (
        <Link href={`/detail/${item.id}`}>
            <article
                className={CN("post-card", {
                    "post-card--masonry": masonry,
                })}
            >
                {header && item.user && follow !== undefined && (
                    <PostHeader
                        handleFollow={handleFollow}
                        userLink={`${item.user.id}`}
                        avatar={item.user.avatar}
                        first_name={item.user.first_name}
                        last_name={item.user.last_name}
                        follow={follow}
                        location={item.location.name}
                        followEnable={followEnable && !item.is_owner}
                        postId={item.id}
                    />
                )}
                <section className={CN("post-card__body")}>
                    <div className="post-card__images">
                        {faveEneble && !item.is_owner && (
                            <button
                                type="button"
                                className={CN(
                                    "post-card__fav button-reset-default-styles",
                                    {
                                        "post-card__fav-faved": inFave,
                                    }
                                )}
                                onClick={(event) => handleFave(event)}
                            >
                                <Icon height={22} width={21}>
                                    {inFave ? (
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M34.2397 2.00038C35.7541 2.00038 37.2661 2.21398 38.7036 2.69638C47.562 5.57635 50.7539 15.2962 48.0875 23.7922C46.5756 28.1337 44.1036 32.0961 40.866 35.3336C36.2317 39.8216 31.1461 43.8055 25.6718 47.2375L25.0718 47.5999L24.4478 47.2135C18.9543 43.8055 13.8399 39.8216 9.16235 35.3096C5.94639 32.0721 3.47201 28.1337 1.93603 23.7922C-0.775942 15.2962 2.41603 5.57635 11.3703 2.64598C12.0663 2.40598 12.7839 2.23798 13.5039 2.14438H13.7919C14.4663 2.04598 15.1359 2.00038 15.8079 2.00038H16.0719C17.5839 2.04598 19.0478 2.30998 20.4662 2.79237H20.6078C20.7038 2.83797 20.7758 2.88837 20.8238 2.93397C21.3542 3.10437 21.8558 3.29637 22.3358 3.56037L23.2478 3.96836C23.4682 4.08589 23.7155 4.26548 23.9293 4.42069C24.0647 4.51902 24.1867 4.60757 24.2798 4.66436C24.319 4.68746 24.3588 4.7107 24.3989 4.73412C24.6047 4.85424 24.819 4.97938 24.9998 5.11795C27.6662 3.08037 30.9037 1.97638 34.2397 2.00038ZM40.6234 19.2804C41.6074 19.254 42.4474 18.4644 42.5194 17.454V17.1684C42.5914 13.806 40.5538 10.7605 37.4554 9.58448C36.4714 9.24608 35.3914 9.77648 35.0314 10.7845C34.6954 11.7925 35.2234 12.8964 36.2314 13.254C37.7698 13.83 38.7994 15.3444 38.7994 17.022V17.0964C38.7538 17.646 38.9194 18.1764 39.2554 18.5844C39.5914 18.9924 40.0954 19.23 40.6234 19.2804Z"
                                            fill="currentColor"
                                        />
                                    ) : (
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M11.7596 1.77804C2.94928 4.70208 -0.984275 14.6171 1.97249 24.077C3.47007 28.5323 5.90844 32.5374 9.11241 35.8201C13.4909 40.2062 18.3239 44.0828 23.5242 47.3803L24.1122 47.7439C24.6786 48.0902 25.3842 48.0853 25.9434 47.7291L26.493 47.3753C31.6843 44.0829 36.5091 40.213 40.8808 35.835C44.096 32.5398 46.5396 28.532 48.0255 24.1165C50.9895 14.6245 47.0416 4.70456 38.2289 1.77804L37.5905 1.58261C33.5658 0.443155 29.2671 0.994696 25.6362 3.11637L24.9906 3.50723L24.3594 3.11637C22.4634 2.0068 20.3644 1.31514 18.1955 1.0852C16.0266 0.855247 13.8351 1.09202 11.7596 1.78051V1.77804ZM23.5002 6.82461L23.9706 7.17095C24.5946 7.63107 25.4346 7.62118 26.0466 7.14868C27.6137 5.9357 29.44 5.12749 31.3725 4.79177C33.305 4.45605 35.2874 4.60259 37.1537 5.21911C43.984 7.48759 47.0896 15.2999 44.6944 22.9712C43.3873 26.8467 41.242 30.365 38.4209 33.2598L37.1537 34.4991C33.7358 37.7732 30.0457 40.7317 26.1258 43.3405L25.0026 44.0678L25.3458 44.2905C20.3771 41.1382 15.7591 37.4334 11.5748 33.2424C8.75138 30.3409 6.60598 26.8149 5.30125 22.9316C2.91568 15.2925 6.00924 7.48512 12.8372 5.21911C14.6154 4.62997 16.5008 4.46813 18.3491 4.74599C20.1973 5.02385 21.9593 5.73403 23.5002 6.82214V6.82461ZM34.2881 10.8545C33.8542 10.7403 33.3944 10.8013 33.0026 11.025C32.6109 11.2486 32.3168 11.618 32.1804 12.0577C32.0441 12.4973 32.0758 12.9741 32.269 13.3905C32.4622 13.8069 32.8025 14.1315 33.2201 14.298C34.1134 14.5965 34.9009 15.1612 35.4831 15.9207C36.0653 16.6802 36.4161 17.6005 36.4913 18.5653C36.5301 19.0436 36.7517 19.4864 37.1072 19.7963C37.4628 20.1062 37.9232 20.2578 38.3873 20.2178C38.8513 20.1778 39.2809 19.9494 39.5815 19.5829C39.8822 19.2164 40.0293 18.7418 39.9904 18.2635C39.8572 16.5858 39.2443 14.9864 38.2293 13.6676C37.2144 12.3488 35.8428 11.3698 34.2881 10.8545V10.8545Z"
                                            fill="currentColor"
                                        />
                                    )}
                                </Icon>
                            </button>
                        )}
                        {item.is_owner && (
                            <div className="post-card__actions">
                                <button className="button-reset-default-styles post-card__actions-button">
                                    <Icon width={24} height={20}>
                                        <EditIcon />
                                    </Icon>
                                </button>
                                <button
                                    className="button-reset-default-styles post-card__actions-button"
                                    onClick={handleDelete}
                                >
                                    &times;
                                </button>
                            </div>
                        )}

                        {item.images.length > 0 ? (
                            <img
                                src={item.images[selectedIndex]?.image}
                                className="post-card__image"
                                alt=""
                                onLoad={handleLoad}
                            />
                        ) : (
                            <img
                                src="/images/noImage.png"
                                className="post-card__image"
                                alt=""
                                onLoad={handleLoad}
                            />
                        )}
                    </div>

                    <div className="post-card__content">
                        {item.images.length > 1 && (
                            <div className="post-card__dots">
                                {item.images.map((image, index) => (
                                    <button
                                        type="button"
                                        className={CN(
                                            "post-card__dot button-reset-default-styles",
                                            {
                                                "post-card__dot--active":
                                                    index === selectedIndex,
                                            }
                                        )}
                                        key={image.id}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setSelectedIndex(index);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                        <p className="post-card__categories">
                            {item.categories}
                        </p>
                        <h4 className="post-card__title">{item.title}</h4>
                        {item.comment_count > 0 && (
                            <button className="button-reset-default-styles post-card__comments">
                                Посмотреть все комментарии ({item.comment_count}
                                )
                            </button>
                        )}
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
                    .post-card {
                        cursor: pointer;
                    }

                    .post-card--masonry {
                        width: 370px;
                    }

                    .post-card__images {
                        position: relative;
                    }

                    .post-card__image {
                        width: 100%;
                        min-height: 190px;
                    }

                    .post-card__fav {
                        position: absolute;
                        color: #fff;
                        right: 10px;
                        top: 10px;
                    }

                    .post-card__fav-faved {
                        color: #e56366;
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
                        max-height: 50px;
                        overflow: hidden;
                    }

                    .post-card__comments {
                        font-family: Inter;
                        font-size: 14px;
                        color: #a5a5a5;
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
                        grid-template-columns: repeat(
                            ${item.images.length},
                            1fr
                        );
                        margin-bottom: 6px;
                    }

                    .post-card__dot {
                        background: #eaeaea;
                        border-radius: 4px;
                    }

                    .post-card__dot--active {
                        background: #e56366;
                    }

                    .post-card__actions {
                        display: none;
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        column-gap: 12px;
                        align-items: center;
                    }

                    .post-card__actions-button {
                        font-size: 32px;
                        color: #fff;
                        font-weight: 100;
                        line-height: 0;
                    }

                    .post-card:hover .post-card__actions {
                        display: flex;
                    }

                    @media all and (max-width: 410px) {
                        .post-card--masonry {
                            width: 300px;
                        }
                    }
                `}</style>
            </article>
        </Link>
    );
}
