import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Icon from "@/components/Icon";
import InstagramIcon from "@/components/icons/InstagramIcon";
import Layout from "@/components/Layout";
import LocationIcon from "@/components/icons/LocationIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { ReactNode } from "react";
import TelagramIcon from "@/components/icons/TelegramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Wrapper from "@/components/Wrapper";

export default function Contacts() {
    return (
        <Wrapper title="Наши контактные данные">
            <div className="contacts">
                <div className="contacts__left">
                    <img
                        src="/images/loginImage.jpg"
                        className="contacts__img"
                        alt=""
                    />
                </div>
                <div className="contacts__right">
                    <h5 className="contacts__title">О нас</h5>
                    <p className="contacts__desc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ac scelerisque orci aliquam consectetur tristique nec.
                        Potenti eu tellus ut odio. Ut a sed ultricies luctus
                        massa faucibus. Cum ornare odio mauris, faucibus
                        consequat tincidunt aliquam enim risus. Est viverraLorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Ac
                        scelerisque orci aliquam consectetur tristique nec.
                        Potenti eu tellus ut odio. Ut a sed ultricies luctus
                        massa faucibus. Cum ornare odio mauris, faucibus
                        consequat tincidunt aliquam enim risus. Est viverra
                    </p>
                    <div className="contacts__footer">
                        <div className="contacts__footer-block">
                            <h5 className="contacts__footer-title">
                                Наши телефоны:
                            </h5>
                            <ul className="contacts__footer-list list-reset-default-styles">
                                <li className="contacts__footer-item">
                                    <Icon width={16} height={16}>
                                        <PhoneIcon />
                                    </Icon>
                                    +996 (555) 55 55 55
                                </li>
                                <li className="contacts__footer-item">
                                    <Icon width={16} height={16}>
                                        <PhoneIcon />
                                    </Icon>
                                    +996 (555) 55 55 55
                                </li>
                                <li className="contacts__footer-item">
                                    <Icon width={16} height={16}>
                                        <PhoneIcon />
                                    </Icon>
                                    +996 (555) 55 55 55
                                </li>
                            </ul>
                        </div>
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
                        <div>
                            <h5 className="contacts__footer-title">
                                Наш адрес:
                            </h5>
                            <ul className="contacts__footer-list list-reset-default-styles">
                                <li className="contacts__footer-item">
                                    <Icon width={16} height={16}>
                                        <LocationIcon />
                                    </Icon>
                                    Бишкек, Ахунбаева 125/66
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
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
