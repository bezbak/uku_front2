import React, { ReactNode, useEffect } from "react";
import {
    publicationAsync,
    selectPublication,
} from "@/components/Post/PostSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Container from "@/components/Container";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Icon from "@/components/Icon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Layout from "@/components/Layout";
import PrevIcon from "@/components/icons/PrevIcon";
import TelagramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { default as _Post } from "@components/Post/Post";
import { useRouter } from "next/router";

export function getServerSideProps() {
    return {
        props: {},
    };
}

const Post = () => {
    const router = useRouter();
    const postId = router.query.id;
    const dispatch = useAppDispatch();
    const post = useAppSelector(selectPublication);

    useEffect(() => {
        dispatch(publicationAsync(postId as string));
    }, []);

    const handlePrev = () => {
        router.back();
    };

    return (
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
                    <div className="post__icons">
                        <a
                            href={post?.user.telegram || ""}
                            type="button"
                            className="post__social"
                            style={{
                                backgroundColor: "#039BE5",
                            }}
                        >
                            <Icon width={32} height={32}>
                                <TelagramIcon />
                            </Icon>
                        </a>
                        <a
                            href={post?.user.whatsapp || ""}
                            type="button"
                            className="post__social"
                            style={{
                                backgroundColor: "#1BD741",
                            }}
                        >
                            <Icon width={32} height={32}>
                                <WhatsAppIcon />
                            </Icon>
                        </a>
                        <a
                            href={post?.user.instagram || ""}
                            type="button"
                            className="post__social"
                            style={{
                                backgroundColor: "#B06DB5",
                            }}
                        >
                            <Icon width={32} height={32}>
                                <InstagramIcon />
                            </Icon>
                        </a>
                    </div>
                </header>
                {!!post && <_Post post={post} />}
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
