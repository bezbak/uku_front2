import React, { ReactNode, useEffect } from "react";
import { contactAsync, selectContact } from "@/app/systemSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Icon from "@/components/Icon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Layout from "@/components/Layout";
import LocationIcon from "@/components/icons/LocationIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import TelagramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Wrapper from "@/components/Wrapper";

export default function Contacts() {
    const contact = useAppSelector(selectContact);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(contactAsync());
    }, []);

    return (
        <Wrapper title="Наши контактные данные">
            {contact && (
                <div className="contacts">
                    <div className="contacts__left">
                        <img
                            src={contact.image}
                            className="contacts__img"
                            alt=""
                        />
                    </div>
                    <div className="contacts__right">
                        <h5 className="contacts__title">{contact.title}</h5>
                        <div
                            className="contacts__desc"
                            dangerouslySetInnerHTML={{
                                __html: contact.description,
                            }}
                        />
                        <div className="contacts__footer">
                            {contact.phone_numbers.length > 1 && (
                                <div className="contacts__footer-block">
                                    <h5 className="contacts__footer-title">
                                        Наши телефоны:
                                    </h5>
                                    <ul className="contacts__footer-list list-reset-default-styles">
                                        {contact.phone_numbers.map((number) => (
                                            <li
                                                className="contacts__footer-item"
                                                key={number.id}
                                            >
                                                <Icon width={16} height={16}>
                                                    <PhoneIcon />
                                                </Icon>
                                                {number.phone}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {contact.instagram ||
                                contact.facebook ||
                                (contact.telegram && (
                                    <div>
                                        <h5 className="contacts__footer-title">
                                            Мы в соц. сетях:
                                        </h5>
                                        <ul className="contacts__footer-list list-reset-default-styles">
                                            <li className="contacts__footer-item">
                                                <Icon width={16} height={16}>
                                                    <TelagramIcon />
                                                </Icon>
                                                Телеграм
                                            </li>
                                            <li className="contacts__footer-item">
                                                <Icon width={16} height={16}>
                                                    <WhatsAppIcon />
                                                </Icon>
                                                WhatsApp
                                            </li>
                                            <li className="contacts__footer-item">
                                                <Icon width={16} height={16}>
                                                    <InstagramIcon />
                                                </Icon>
                                                Instagram
                                            </li>
                                        </ul>
                                    </div>
                                ))}

                            {contact.address && (
                                <div>
                                    <h5 className="contacts__footer-title">
                                        Наш адрес:
                                    </h5>
                                    <ul className="contacts__footer-list list-reset-default-styles">
                                        <li className="contacts__footer-item">
                                            <Icon width={16} height={16}>
                                                <LocationIcon />
                                            </Icon>
                                            {contact.address}
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .contacts {
                    display: flex;
                    gap: 32px;
                }

                .contacts__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .contacts__title {
                    font-size: 16px;
                    margin-bottom: 6px;
                }

                .contacts__desc {
                    font-size: 14px;
                    line-height: 140%;
                }

                .contacts__footer {
                    margin-top: 33px;
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 20px;
                }

                .contacts__footer-title {
                    font-size: 17px;
                    margin-bottom: 8px;
                }

                .contacts__footer-item {
                    color: #767676;
                    margin-bottom: 12px;
                    display: flex;
                    column-gap: 8px;
                    align-items: center;
                }

                @media all and (max-width: 860px) {
                    .contacts__left {
                        display: none;
                    }
                }
            `}</style>
        </Wrapper>
    );
}

Contacts.getLayout = function getLayout(page: ReactNode) {
    return (
        <Layout>
            <Header />
            {page}
            <Footer />
        </Layout>
    );
};
