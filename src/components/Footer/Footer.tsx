import AppStoreIcon from "../icons/AppStoreIcon";
import Container from "../Container";
import GooglePlayIcon from "../icons/GooglePlayIcon";
import Icon from "../Icon";
import Link from "next/link";
import React from "react";

export default function Footer() {
    return (
        <div className="footer">
            <Container>
                <div className="footer__inner">
                    <ul className="footer__list list-reset-default-styles">
                        <Link href={"/contacts"}>
                            <li className="footer__item">Контакты</li>
                        </Link>
                        <Link href={"/faq"}>
                            <li className="footer__item">F.A.Q.</li>
                        </Link>
                    </ul>
                    <div className="footer_right">
                        <a
                            href=""
                            className="link-reset-default-styles footer_right-link"
                        >
                            <span>
                                <Icon height={22} width={18}>
                                    <AppStoreIcon />
                                </Icon>
                            </span>
                            <span>
                                <p className="footer_right-text">доступно на</p>
                                <p className="footer_right-app">App Store</p>
                            </span>
                        </a>
                        <a
                            href=""
                            className="link-reset-default-styles footer_right-link"
                        >
                            <span>
                                <Icon height={22} width={18}>
                                    <GooglePlayIcon />
                                </Icon>
                            </span>
                            <span>
                                <p className="footer_right-text">доступно на</p>
                                <p className="footer_right-app">Google Play</p>
                            </span>
                        </a>
                    </div>
                </div>
            </Container>
            <style jsx>{`
                .footer {
                    width: 100%;
                    padding: 19px 0;
                    background: #f9f9f9;
                    margin-top: 20px;
                }

                .footer__inner {
                    display: flex;
                    justify-content: space-between;
                }

                .footer__list {
                    display: flex;
                    column-gap: 19px;
                }

                .footer__item {
                    cursor: pointer;
                    font-size: 15px;
                    color: #4f4f4f;
                }

                .footer_right {
                    display: flex;
                    column-gap: 8px;
                    align-items: center;
                }

                .footer_right-link {
                    background: #e56366;
                    border-radius: 5px;
                    padding: 7px;
                    display: flex;
                    column-gap: 11px;
                    align-items: center;
                    color: #fff;
                    width: 120px;
                    height: 35px;
                }

                .footer_right-text {
                    font-size: 9px;
                }

                .footer_right-app {
                    font-size: 11px;
                }
            `}</style>
        </div>
    );
}
