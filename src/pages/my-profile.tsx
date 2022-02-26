import {
    selectConfirmStatusConfirm,
    selectMessageConfirm,
    selectStatusConfirm,
} from "@/components/MyProfile/ConfirmSlice";

import Auth from "@/components/Authorization/Auth";
import Confirm from "@/components/Authorization/Confirm";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout";
import Login from "@/components/Authorization/Login";
import Profile from "@/components/MyProfile/Profile";
import { ReactNode } from "react";
import { selectProfilePage } from "@/components/MyProfile/ProfileSlice";
import { useAppSelector } from "@/app/hooks";

const MyProfile = () => {
    const profilePage = useAppSelector(selectProfilePage);
    const status = useAppSelector(selectStatusConfirm);
    const message = useAppSelector(selectMessageConfirm);
    const confirmStatus = useAppSelector(selectConfirmStatusConfirm);
    return (
        <Layout>
            {profilePage === "main" ? (
                <>
                    <Header />
                    <Profile />
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
