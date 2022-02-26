import React, { useEffect, useState } from "react";
import {
    profileAsync,
    profileInfoAsync,
    selectPage,
    selectProfile,
    selectProfileInfo,
    sendSmsToOldPhoneAsync,
    updateProfileAsync,
} from "./ProfileSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Button from "../Buttons/Button";
import ConfirmAlert from "../Alert/ConfirmAlert";
import Container from "../Container";
import EditProfileInfo from "./EditProfileInfo";
import { EditProfileSchema } from "./types";
import { IErroType } from "../Authorization/types";
import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import ProfileInfo from "./ProfileInfo";
import { assert } from "superstruct";
import { changeNumber } from "../Authorization/authSlice";
import getFormDate from "@/utils/getFormData";
import { useRouter } from "next/router";

export interface IProfileProps {}

interface IConfirmAlert {
    title: string;
    open: boolean;
    confirmText: string;
}

export default function Profile(props: IProfileProps) {
    const confirmAlertInitial = {
        title: "",
        open: false,
        confirmText: "",
    };
    const [edit, setEdit] = useState(false);
    const [alert, setAlert] = useState<IConfirmAlert>(confirmAlertInitial);
    const profile = useAppSelector(selectProfile);
    const page = useAppSelector(selectPage);
    const info = useAppSelector(selectProfileInfo);
    const dispatch = useAppDispatch();
    const rout = useRouter();

    useEffect(() => {
        dispatch(profileAsync(page));
    }, [page]);

    useEffect(() => {
        dispatch(profileInfoAsync());
    }, []);

    const confirmChange = () => {
        dispatch(sendSmsToOldPhoneAsync(rout));
        if (info) dispatch(changeNumber(info.phone));
    };

    const handleChange = () => {
        setAlert({
            title: "Вы действительно хотите сменить номер?",
            open: true,
            confirmText: "Сменить",
        });
        setEdit(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const data = getFormDate(event.currentTarget);
        try {
            assert(data, EditProfileSchema);
            dispatch(updateProfileAsync(data));
            setEdit(false);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    return (
        <section className="profile">
            <Container>
                <div className="profile__inner">
                    <aside className="profile__aside">
                        <ProfileInfo info={info} onEdit={() => setEdit(true)} />
                    </aside>
                    <main className="profile__main">
                        <header className="profile__header">
                            <h1 className="profile__title">Публикации</h1>
                            <Button type="button" className="profile__button">
                                Подписаться
                            </Button>
                        </header>
                        <div className="profile__body">
                            <PostList>
                                {profile?.results.map((item) => {
                                    return (
                                        <PostCard key={item.id} item={item} />
                                    );
                                })}
                            </PostList>
                        </div>
                    </main>
                </div>
            </Container>
            <EditProfileInfo
                info={info}
                onSubmit={(event) => handleSubmit(event)}
                open={edit}
                onClose={() => setEdit(false)}
                onChange={handleChange}
            />
            <ConfirmAlert
                open={alert.open}
                title={alert.title}
                confirmText={alert.confirmText}
                onCancel={() => setAlert(confirmAlertInitial)}
                onConfirm={confirmChange}
            />

            <style jsx global>{`
                .profile {
                    padding: 35px 0;
                }
                .profile__inner {
                    display: flex;
                    column-gap: 21px;
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
            `}</style>
        </section>
    );
}
