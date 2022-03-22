import React, { ReactNode, useEffect, useState } from "react";
import {
    deletePostAsync,
    publicationAsync,
    selectPublication,
} from "@/components/Post/PostSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import ConfirmAlert from "@/components/Alert/ConfirmAlert";
import Container from "@/components/Container";
import EditPostModal from "@/components/Post/EditPostModal";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Icon from "@/components/Icon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Layout from "@/components/Layout";
import PrevIcon from "@/components/icons/PrevIcon";
import TelagramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { default as _Post } from "@components/Post/Post";
import { editPost } from "@/app/mainSlice";
import { useRouter } from "next/router";

export function getServerSideProps() {
    return {
        props: {},
    };
}

interface IConfirmAlert {
    title: string;
    open: boolean;
    confirmText: string;
    name: string;
}

const Post = () => {
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

    const confirmDelete = async () => {
        if (post) await dispatch(deletePostAsync(post.id));
        router.push("/");
    };

    return (
        <>
            <section className="post">
                <Container>
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
                        ) : (
                            <div className="post__icons">
                                <a
                                    href={`http://t.me/${post?.user.telegram}`}
                                    type="button"
                                    className="post__social"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        backgroundColor: "#039BE5",
                                    }}
                                >
                                    <Icon width={32} height={32}>
                                        <TelagramIcon />
                                    </Icon>
                                </a>
                                <a
                                    href={`https://wa.me/${post?.user.whatsapp
                                        ?.split(" ")
                                        .join("")}`}
                                    type="button"
                                    className="post__social"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        backgroundColor: "#1BD741",
                                    }}
                                >
                                    <Icon width={32} height={32}>
                                        <WhatsAppIcon />
                                    </Icon>
                                </a>
                                <a
                                    href={`https://instagram.com/${post?.user.instagram}`}
                                    type="button"
                                    className="post__social"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        backgroundColor: "#B06DB5",
                                    }}
                                >
                                    <Icon width={32} height={32}>
                                        <InstagramIcon />
                                    </Icon>
                                </a>
                            </div>
                        )}
                    </header>
                    {!!post && <_Post post={post} />}
                    <ConfirmAlert
                        open={alert.open}
                        title={alert.title}
                        confirmText={alert.confirmText}
                        onCancel={() => setAlert(confirmAlertInitial)}
                        onConfirm={confirmDelete}
                    />
                </Container>
                <style jsx>{`
                    .post {
                        padding: 32px 0;
                    }
                    .post__header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 24px;
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

                    .post__icons {
                        display: flex;
                        column-gap: 12px;
                    }

                    .post__social {
                        background: #039be5;
                        border-radius: 6px;
                        width: 42px;
                        height: 42px;
                        border: none;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                `}</style>
            </section>
            <EditPostModal />
        </>
    );
};

export default Post;

Post.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
