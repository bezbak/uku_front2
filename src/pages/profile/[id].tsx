import React, { ReactNode, useEffect, useState } from "react";
import {
    publicationProfileInfo,
    selectProfile,
    selectProfileInfo,
} from "@/components/MyProfile/ProfileSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout";
import { default as _Profile } from "@components/MyProfile/Profile";
import { followAsync } from "@/components/Post/PostSlice";
import { useGetToken } from "@/hooks/useGetToken";
import { useRouter } from "next/router";

export function getServerSideProps() {
    return {
        props: {},
    };
}

export default function Profile() {
    const rout = useRouter();
    const info = useAppSelector(selectProfileInfo);
    const profile = useAppSelector(selectProfile);
    const dispatch = useAppDispatch();
    const [follow, setFollow] = useState(false);
    const [page, setPage] = useState(1);
    const auth = useGetToken();
    const handleFollow = async () => {
        if (auth) {
            const { payload } = await dispatch(
                followAsync((rout.query as any).id)
            );
            setFollow((payload as any).subscribe);
        } else {
            rout.push("/login");
        }
    };

    useEffect(() => {
        dispatch(publicationProfileInfo((rout.query as any).id));
    }, [follow]);

    useEffect(() => {
        if (info) setFollow(info.following);
    }, [info]);

    return (
        <_Profile
            onAction={handleFollow}
            page="user"
            info={info}
            posts={profile}
            follow={follow}
            setPage={setPage}
        />
    );
}

Profile.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
