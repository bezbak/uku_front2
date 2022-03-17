import React, { ReactNode, useEffect } from "react";
import { faqAsync, selectFaq } from "@/app/systemSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import AccardionItem from "@/components/Accourdion/AccordionItem";
import Accordion from "@/components/Accourdion/Accourdion";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout";
import Wrapper from "@/components/Wrapper";

export default function FAQ() {
    const faq = useAppSelector(selectFaq);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(faqAsync());
    }, []);

    return (
        <Wrapper title="F.A.Q.">
            <Accordion>
                {faq.map((faq) => (
                    <AccardionItem key={faq.id} faq={faq} />
                ))}
            </Accordion>
        </Wrapper>
    );
}

FAQ.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
