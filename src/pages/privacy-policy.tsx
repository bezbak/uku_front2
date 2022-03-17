import React, { ReactNode, useEffect } from "react";
import { privacyPolicyAsync, selectPrivacy } from "@/app/systemSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout";
import Wrapper from "@/components/Wrapper";

export default function PrivacyPolicy() {
    const privacy = useAppSelector(selectPrivacy);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(privacyPolicyAsync());
    }, []);

    return (
        <Wrapper title={"Политика конфиденциальности"}>
            {privacy && (
                <div className="aggrement">
                    <h3 className="aggrement__title">{privacy.title}</h3>
                    <div
                        className="aggrement__content"
                        dangerouslySetInnerHTML={{
                            __html: privacy.description,
                        }}
                    />
                </div>
            )}
            <style jsx global>{`
                .aggrement__title {
                    font-size: 22px;
                    margin-bottom: 10px;
                    font-weight: 500;
                    color: #121213;
                }
                .aggrement__content p {
                    word-break: break-all;
                    font-size: 14px;
                    line-height: 140%;
                    color: #3e3e3e;
                }
            `}</style>
        </Wrapper>
    );
}

PrivacyPolicy.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
