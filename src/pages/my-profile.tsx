import React, { useEffect, useState } from "react";
import {
    profileAsync,
    profileInfoAsync,
    selectProfile,
    selectProfileInfo,
    selectProfilePage,
    sendSmsToOldPhoneAsync,
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
import { changeNumber } from "@/components/Authorization/authSlice";
import getFormDate from "@/utils/getFormData";
import { useRouter } from "next/router";

interface IConfirmAlert {
    title: string;
    open: boolean;
    confirmText: string;
}

const MyProfile = () => {
    const confirmAlertInitial = {
        title: "",
        open: false,
        confirmText: "",
    };
    const profilePage = useAppSelector(selectProfilePage);
    const status = useAppSelector(selectStatusConfirm);
    const message = useAppSelector(selectMessageConfirm);
    const confirmStatus = useAppSelector(selectConfirmStatusConfirm);
    const info = useAppSelector(selectProfileInfo);
    const rout = useRouter();
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    const [alert, setAlert] = useState<IConfirmAlert>(confirmAlertInitial);
    const [page, setPage] = useState(0);
    const profile = useAppSelector(selectProfile);
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
        } catch (error: unknown) {}
    };
    return (
        <Layout>
            {profilePage === "main" ? (
                <>
                    <Header />
                    <Profile
                        onAction={setEdit}
                        page="my"
                        info={info}
                        posts={profile}
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
