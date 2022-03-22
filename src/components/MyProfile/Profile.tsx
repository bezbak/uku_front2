import { IProfileFeed, IprofileInfo } from "@/services/types";
import React, { useEffect, useRef } from "react";

import Container from "../Container";
import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import ProfileInfo from "./ProfileInfo";
import { selectProfileStatus } from "./ProfileSlice";
import { useAppSelector } from "@/app/hooks";

export interface IProfileProps {
    onAction: (action: boolean) => void;
    page: "my" | "user";
    posts: IProfileFeed | null;
    info: IprofileInfo | null;
    follow?: boolean;
    setPage: (page: number) => void;
    onDelete?: (id: number) => void;
}

export default function Profile({
    onAction,
    page,
    info,
    posts,
    follow,
    setPage,
    onDelete,
}: IProfileProps) {
    const ref = useRef(null);
    const status = useAppSelector(selectProfileStatus);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    status !== "loading" &&
                    posts?.next
                ) {
                    setPage(posts?.next);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );
        if (ref && ref.current && posts?.next && status !== "loading") {
            observer.observe(ref.current);
        }
        return () => {
            ref.current ? observer.unobserve(ref.current) : undefined;
        };
    }, [posts?.next]);

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
                                        <PostCard
                                            key={item.id}
                                            item={item}
                                            header={false}
                                            faveEneble={false}
                                            followEnable={false}
                                            onDelete={(id) => {
                                                if (onDelete) onDelete(id);
                                            }}
                                        />
                                    );
                                })}
                            </PostList>
                            <div ref={ref} />
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
                    margin-bottom: 24px;
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
