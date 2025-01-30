import React, { ReactNode, useEffect, useState } from "react";
import {
    deletePostAsync,
    faveAsync,
    publicationAsync,
    selectPublication,
} from "@/components/Post/PostSlice";
import { editPost, setAuthConfirm } from "@/app/mainSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Actions from "@/components/Actions";
import CN from "classnames";
import ConfirmAlert from "@/components/Alert/ConfirmAlert";
import EditPostModal from "@/components/Post/EditPostModal";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import PrevIcon from "@/components/icons/PrevIcon";
import { default as _Post } from "@components/Post/Post";
import { useGetToken } from "@/hooks/useGetToken";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";

interface PostProps {
    title: string;
}

export const getServerSideProps: GetServerSideProps<PostProps> = async (context) => {
    const { id } = context.params as { id: string };
    let title: string = "uku.kg";

    try {
        const res = await fetch(`https://uku.kg/api/v1/publication/${id}/`);
        if (res.ok) {
            const data = await res.json();
            
            title = `${data.title} - ${data.category.name}` || title;
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }

    return { props: { title } };
};


interface IConfirmAlert {
    title: string;
    open: boolean;
    confirmText: string;
    name: string;
}

const Post = ({ title }) => {
    const confirmAlertInitial = {
        name: "",
        title: "",
        open: false,
        confirmText: "",
    };
    const router = useRouter();
    const postId = router.query.id;
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectPublication);
    const [alert, setAlert] = useState<IConfirmAlert>(confirmAlertInitial);
    const [inFave, setInFave] = useState(post?.is_favorite);
    const [actions, setActions] = React.useState(false);

    useEffect(() => {
        dispatch(publicationAsync(postId as string));
    }, []);

    const handlePrev = () => {
        router.back();
    };

    const handleEditPost = () => {
        dispatch(editPost(post));
    };

    const handleDeletePost = () => {
        setAlert({
            title: "Вы действительно хотите удалить объявление?",
            open: true,
            confirmText: "Удалить",
            name: "delete",
        });
    };

    const handleFave = async (event: any) => {
        event.preventDefault();
        const auth = useGetToken();
        if (auth && post) {
            await dispatch(faveAsync(post.id));
            setInFave(!inFave);
        } else {
            dispatch(setAuthConfirm(true));
        }
    };

    const confirmDelete = async () => {
        if (post) await dispatch(deletePostAsync(post.id));
        router.push("/");
    };

    const handleAction = (action: string) => {
        if (action === "edit") {
            handleEditPost();
        } else if (action === "delete") {
            handleDeletePost();
        }
        setActions(false);
    };
    if (!post) return null;

    return (
        <>
            
            <section className="post">
                <header className="post__header">
                    <button
                        type="button"
                        className="button-reset-default-styles post__prev"
                        onClick={handlePrev}
                    >
                        <Icon>
                            <PrevIcon />
                        </Icon>
                        <span>Назад</span>
                    </button>
                    {post?.is_owner ? (
                        <>
                            <div className="post__actions">
                                <button
                                    type="button"
                                    className="button-reset-default-styles post__prev"
                                    onClick={handleEditPost}
                                >
                                    <span>Редактировать</span>
                                </button>
                                <button
                                    type="button"
                                    className="button-reset-default-styles post__prev"
                                    onClick={handleDeletePost}
                                >
                                    <span>Удалить</span>
                                </button>
                            </div>
                            <div className="post__actions-mobile">
                                <button
                                    className="post__actions-mobile-button button-reset-default-styles"
                                    onClick={() => setActions(!actions)}
                                >
                                    <span className="post__actions-mobile-dot"></span>
                                    <span className="post__actions-mobile-dot"></span>
                                    <span className="post__actions-mobile-dot"></span>
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
                        </>
                    ) : (
                        <>
                            <div className="post__left">
                                <div>
                                    <button
                                        type="button"
                                        className={CN(
                                            "post__fave button-reset-default-styles",
                                            {
                                                "post__fave--faved": inFave,
                                            }
                                        )}
                                        onClick={(event) => handleFave(event)}
                                    >
                                        <Icon height={25} width={25}>
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
                                </div>
                            </div>
                        </>
                    )}
                </header>
                {!!post && (
                    <_Post
                        post={post}
                        onDelete={handleDeletePost}
                        onEdit={handleEditPost}
                    />
                )}
                <ConfirmAlert
                    open={alert.open}
                    title={alert.title}
                    confirmText={alert.confirmText}
                    onCancel={() => setAlert(confirmAlertInitial)}
                    onConfirm={confirmDelete}
                />
                <style jsx>{`
                        .post {
                            padding: 32px 0;
                        }
                        .post__header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 24px;
                            padding: 0 10px;
                        }

                        .post__prev {
                            padding: 8px 24px;
                            display: flex;
                            align-items: center;
                            column-gap: 12px;
                            border: 1px solid #d8d8d8;
                            border-radius: 6px;
                        }

                        .post__actions {
                            display: flex;
                            column-gap: 12px;
                        }
                        .post__left {
                            display: flex;
                            column-gap: 12px;
                            align-items: center;
                        }

                        .post__fave--faved {
                            color: #e56366;
                        }

                        .post__actions-mobile {
                            display: none;
                        }

                        .post__actions-mobile-dot {
                            height: 4px;
                            width: 4px;
                            background-color: #000;
                            border-radius: 50%;
                            display: block;
                            margin-bottom: 2px;
                        }

                        .post__actions-mobile-button {
                            padding: 10px;
                        }

                        @media all and (max-width: 470px) {
                            .post__actions {
                                display: none;
                            }
                            .post__actions-mobile {
                                display: block;
                                position: relative;
                            }
                        }
                    `}</style>
            </section>
            <EditPostModal />
        </>
    );
};

export default Post;

Post.getLayout = function getLayout(page: ReactNode) {
    const {title} = page.props.children[0].props;
    
    return (
        <Layout>
            <Head>
                <title>{`${title} | uku.kg`}</title>
            </Head>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
