import React, { useEffect, useRef, useState } from "react";
import {
    changePage,
    profileAsync,
    profileInfoAsync,
    selectProfile,
    selectProfileInfo,
    selectProfilePage,
    updateProfileAsync,
} from "@/components/MyProfile/ProfileSlice";
import {
    selectConfirmStatusConfirm,
    selectMessageConfirm,
    selectStatusConfirm,
} from "@/components/MyProfile/ConfirmSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Auth from "@/components/Authorization/Auth";
import Confirm from "@/components/Authorization/Confirm";
import ConfirmAlert from "@/components/Alert/ConfirmAlert";
import EditProfileInfo from "@/components/MyProfile/EditProfileInfo";
import { EditProfileSchema } from "@/components/MyProfile/types";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout";
import Login from "@/components/Authorization/Login";
import Profile from "@/components/MyProfile/Profile";
import { assert } from "superstruct";
import {
    changeNumber,
    selectMessage,
} from "@/components/Authorization/authSlice";
import { deletePostAsync } from "@/components/Post/PostSlice";
import getFormDate from "@/utils/getFormData";
import { authentication, authProvider } from "@/config/firebase.config";
import { RecaptchaVerifier } from "firebase/auth";
import { toast } from "react-toastify";

interface IConfirmAlert {
    title: string;
    open: boolean;
    confirmText: string;
    name: string;
}

const MyProfile = () => {
    const confirmAlertInitial = {
        name: "",
        title: "",
        open: false,
        confirmText: "",
    };
    const profilePage = useAppSelector(selectProfilePage);
    const status = useAppSelector(selectStatusConfirm);
    const message = useAppSelector(selectMessage);
    const confirmStatus = useAppSelector(selectConfirmStatusConfirm);
    const info = useAppSelector(selectProfileInfo);
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    const [alert, setAlert] = useState<IConfirmAlert>(confirmAlertInitial);
    const [page, setPage] = useState(1);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const profile = useAppSelector(selectProfile);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(profileAsync(page));
    }, [page]);

    useEffect(() => {
        dispatch(profileInfoAsync());
    }, []);

    const confirmChange = async () => {
        if (alert.name === "delete") {
            if (deleteId) dispatch(deletePostAsync(deleteId));
            updatePost();
        } else if (alert.name === "number") {
            try {
                if (info) {
                    const verify = new RecaptchaVerifier(
                        "recaptcha-container",
                        {
                            size: "invisible",
                        },
                        authentication
                    );
                    const verifideId = await authProvider.verifyPhoneNumber(
                        info.phone,
                        verify
                    );
                    window.verifideId = verifideId;
                    dispatch(changePage("oldConfirm"));
                }
                if (info) dispatch(changeNumber(info.phone));
            } catch (error) {
                toast.error(
                    `Что то пошло нет так! попробуйте позже ${
                        (error as any).code ? (error as any).code : ""
                    }`
                );
            }
        }
        setAlert(confirmAlertInitial);
    };

    const handleChange = () => {
        setAlert({
            title: "Вы действительно хотите сменить номер?",
            open: true,
            confirmText: "Сменить",
            name: "number",
        });
        setEdit(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const data = getFormDate(event.currentTarget);
        try {
            assert(data, EditProfileSchema);
            dispatch(updateProfileAsync(data));
            setEdit(false);
        } catch (error: unknown) {}
    };

    const updatePost = () => {
        dispatch(profileAsync(1));
    };

    const handleDelete = (id: number) => {
        setAlert({
            title: "Вы действительно хотите удалить объявление?",
            open: true,
            confirmText: "Удалить",
            name: "delete",
        });
        setDeleteId(id);
    };

    const handlePhoneChnage = () => {
        setEdit(true);
    };

    return (
        <Layout>
            {profilePage === "main" ? (
                <>
                    <Header />
                    <Profile
                        onAction={handlePhoneChnage}
                        page="my"
                        info={info}
                        posts={profile}
                        setPage={setPage}
                        onDelete={(id: number) => handleDelete(id)}
                    />
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
                    <Footer />
                    <div id="recaptcha-container" ref={ref}></div>
                </>
            ) : (
                <Auth>
                    {
                        {
                            newConfirm: (
                                <Confirm
                                    confirmStatus={confirmStatus}
                                    status={status}
                                    message={message}
                                    type="new"
                                />
                            ),
                            oldConfirm: (
                                <Confirm
                                    confirmStatus={confirmStatus}
                                    status={status}
                                    message={message}
                                    type="old"
                                />
                            ),
                            newPhone: (
                                <Login
                                    status={status}
                                    message={message}
                                    type="new"
                                />
                            ),
                        }[profilePage]
                    }
                </Auth>
            )}
        </Layout>
    );
};

export default MyProfile;
