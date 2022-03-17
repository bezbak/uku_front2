import { IProfileFeed, IprofileInfo } from "@/services/types";

import Container from "../Container";
import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import ProfileInfo from "./ProfileInfo";
import React from "react";

export interface IProfileProps {
    onAction: (action: boolean) => void;
    page: "my" | "user";
    posts: IProfileFeed | null;
    info: IprofileInfo | null;
    follow?: boolean;
}

export default function Profile({
    onAction,
    page,
    info,
    posts,
    follow,
}: IProfileProps) {
    return (
        <section className="profile">
            <Container>
                <div className="profile__inner">
                    <aside className="profile__aside">
                        <ProfileInfo
                            info={info}
                            onEdit={() => onAction(true)}
                            page={page}
                            follow={follow}
                        />
                    </aside>
                    <main className="profile__main">
                        <header className="profile__header">
                            <h1 className="profile__title">Публикации</h1>
                        </header>
                        <div className="profile__body">
                            <PostList>
                                {posts?.results.map((item) => {
                                    return (
                                        <PostCard key={item.id} item={item} />
                                    );
                                })}
                            </PostList>
                        </div>
                    </main>
                </div>
            </Container>
            <style jsx global>{`
                .profile {
                    padding: 35px 0;
                    min-height: 70vh;
                }
                .profile__inner {
                    display: flex;
                    gap: 21px;
                }
                .profile__aside {
                    width: 30%;
                }
                .profile__main {
                    width: 70%;
                }
                .profile__header {
                    display: flex;
                    justify-content: space-between;
                }
                .profile__title {
                    font-weight: 500;
                }
                .profile .profile__button {
                    width: auto;
                }

                @media all and (max-width: 1030px) {
                    .profile__inner {
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                    .profile__main {
                        width: 100%;
                    }
                    .profile__aside {
                        width: 50%;
                    }
                }

                @media all and (max-width: 640px) {
                    .profile__aside {
                        width: 80%;
                    }
                }

                @media all and (max-width: 400px) {
                    .profile__aside {
                        width: 100%;
                    }
                }
            `}</style>
        </section>
    );
}
