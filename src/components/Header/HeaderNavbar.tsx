import { useEffect, useState } from "react";

import Avatar from "../Avatar";
import Container from "../Container";
import { HearIcon } from "../icons/HeartIcon";
import Icon from "../Icon";
import Link from "next/link";
import LocationIcon from "../icons/LocationIcon";
import LocationModal from "../Location/LocationModal";
import Logo from "./Logo";
import React from "react";
import SearchIcon from "../icons/SearchIcon";
import Select from "react-select";
import { useGetToken } from "@/hooks/useGetToken";
import { useRouter } from "next/router";

export default function HeaderNavbar() {
    const router = useRouter();
    const token = useGetToken();
    const [locationModal, setLocationModal] = useState(false);
    const [location, setLocation] = useState<{
        id: number;
        name: string;
    }>({
        id: 0,
        name: "",
    });

    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <div className="navbar">
            <Container>
                <div className="navbar__inner">
                    <div className="navbar__left">
                        <Logo />
                        <Select
                            id="long-value-select"
                            instanceId="long-value-select"
                            placeholder="Введите название объявления"
                            name="search"
                            hideSelectedOptions={true}
                        />
                    </div>
                    <div className="navbar__right">
                        <ul className="navbar__right-list list-reset-default-styles">
                            {router.route === "/search" && (
                                <li>
                                    <button
                                        type="button"
                                        className="navbar__right-link button-reset-default-styles"
                                        onClick={() => setLocationModal(true)}
                                    >
                                        <Icon width={18} height={18}>
                                            <LocationIcon />
                                        </Icon>
                                        <span>Выбор</span>
                                    </button>
                                </li>
                            )}
                            <li>
                                <Link href={"/search"}>
                                    <a className="navbar__right-link link-reset-default-styles">
                                        <Icon width={18} height={18}>
                                            <SearchIcon />
                                        </Icon>
                                        <span>Поиск</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/favourite">
                                    <a className="navbar__right-link link-reset-default-styles">
                                        <Icon width={18} height={18}>
                                            <HearIcon />
                                        </Icon>
                                        <span>Избранное</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={token ? "/my-profile" : "/login"}>
                                    <div className="navbar__right-link">
                                        {token ? (
                                            <>
                                                <Avatar
                                                    name=""
                                                    width={22}
                                                    height={22}
                                                    placholder={true}
                                                    randomColor={false}
                                                />
                                                <span>Профиль</span>
                                            </>
                                        ) : (
                                            <>
                                                <Icon width={18} height={18}>
                                                    <path
                                                        d="M16.5914 27.2941C16.1659 27.6841 16.1659 28.3181 16.5914 28.7081C16.8052 28.9021 17.0844 29.0001 17.3637 29.0001C17.6431 29.0001 17.9223 28.9022 18.134 28.7081L24.6795 22.7081C24.7798 22.6161 24.8606 22.5041 24.9151 22.3821C24.9457 22.3121 24.95 22.2401 24.9631 22.1661C24.974 22.1102 25.0002 22.0581 25.0002 22.0001C25.0002 21.9241 24.9696 21.8561 24.9522 21.7861C24.9391 21.7321 24.9391 21.674 24.9151 21.6221C24.8583 21.4961 24.7755 21.3841 24.6729 21.2881L18.134 15.294C17.7085 14.904 17.0168 14.904 16.5914 15.294C16.1659 15.684 16.1659 16.3181 16.5914 16.7081L21.2714 21.0001H2.09095C1.48876 21.0001 1 21.4481 1 22.0001C1 22.5521 1.48876 23.0001 2.09095 23.0001H21.2758L16.5914 27.2941Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M44.2895 1C44.1215 1 43.9579 1.03 43.7942 1.04603C43.7114 1.02803 43.6328 1 43.5455 1H17.3635C14.357 1 11.9089 3.24401 11.9089 5.99999V16.0001C11.9089 16.5521 12.3977 17.0001 12.9999 17.0001C13.6021 17.0001 14.0908 16.5521 14.0908 16.0001V5.99999C14.0908 4.34595 15.5592 2.99998 17.3636 2.99998H38.2306L30.0378 6.21796C28.3033 6.89999 27.1818 8.45794 27.1818 10.188V41.0001H17.3636C15.7948 41.0001 14.4618 40.0001 14.1367 39.5861L14.0908 27.996C14.0887 27.4459 13.5999 27 12.9999 27C12.9999 27 12.9977 27 12.9955 27C12.3933 27.0019 11.9068 27.4519 11.9089 28.0039L11.9592 39.658C11.9155 40.096 12.1403 40.5539 12.642 41.0579C13.5344 41.9539 15.3061 43 17.3635 43H27.1817V44.682C27.1817 47.062 29.2959 49 31.8923 49C32.536 49 33.1622 48.882 33.7469 48.652L46.144 43.782C47.8786 43.0999 49 41.542 49 39.8119V5.31805C49.0001 2.93801 46.8859 1 44.2895 1ZM46.8182 39.8122C46.8182 40.7402 46.216 41.5782 45.2844 41.9422L32.8873 46.8122C32.5731 46.9382 32.2371 47.0001 31.8923 47.0001C30.4982 47.0001 29.3636 45.9601 29.3636 44.6821V10.188C29.3636 9.25997 29.9658 8.42203 30.8974 8.058L43.2946 3.18804C43.6088 3.06204 43.9448 3.00007 44.2895 3.00007C45.6837 3.00007 46.8182 4.04004 46.8182 5.31805V39.8122Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M32.6371 23.0001C32.0349 23.0001 31.5461 23.4482 31.5461 24.0002V28.0001C31.5461 28.5521 32.0349 29.0001 32.6371 29.0001C33.2393 29.0001 33.728 28.5521 33.728 28.0001V24.0001C33.7279 23.4481 33.2393 23.0001 32.6371 23.0001Z"
                                                        fill="currentColor"
                                                    />
                                                </Icon>
                                                <span>Войти</span>
                                            </>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
            <LocationModal
                open={locationModal}
                title="Найдите ваш город"
                setLocation={setLocation}
                setLocationModal={setLocationModal}
            />
            <style jsx global>{`
                .navbar {
                    padding: 16px 0;
                    box-shadow: inset 0px -1px 0px rgb(0 0 0 / 5%);
                }

                .navbar__inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .navbar__left {
                    display: flex;
                    column-gap: 32px;
                    align-items: center;
                }

                .navbar__right-list {
                    display: flex;
                    column-gap: 16px;
                    align-items: center;
                }

                .navbar__right-link {
                    display: flex;
                    column-gap: 11px;
                    align-items: center;
                    font-size: 18px;
                    color: #181818;
                    cursor: pointer;
                }

                .navbar__right-link svg {
                    color: #979797;
                }
            `}</style>
        </div>
    );
}
