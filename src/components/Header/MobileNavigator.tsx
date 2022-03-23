import React, { useEffect, useState } from "react";
import {
    selectLocation,
    setLocationModal,
    setSearchOverlay,
} from "@/app/mainSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Avatar from "../Avatar";
import CN from "classnames";
import { CategoryItem } from "../Search/Category/CategoryItem";
import { HearIcon } from "../icons/HeartIcon";
import { ICategoryList } from "@/services/types";
import Icon from "../Icon";
import Link from "next/link";
import LocationIcon from "../icons/LocationIcon";
import RigthArrowIcon from "../icons/RightArrowIcon";
import SearchIcon from "../icons/SearchIcon";
import { selectCategory } from "../Search/Category/CategorySlice";
import { useGetToken } from "@/hooks/useGetToken";
import { useRouter } from "next/router";

function MobileNavigator({
    open = false,
    avatar,
    setOpen,
}: {
    open: boolean;
    setOpen: (opne: boolean) => void;
    avatar: string;
}) {
    const auth = useGetToken();
    const rout = useRouter();
    const [category, setCategory] = useState(false);
    const items = useAppSelector(selectCategory);
    const dispatch = useAppDispatch();
    const location = useAppSelector(selectLocation);

    useEffect(() => {
        if (!open) setCategory(false);
    }, [open]);

    return (
        <ul
            className={CN("mobile-navigator list-reset-default-styles", {
                "mobile-navigator--open": open,
            })}
        >
            {category ? (
                <div onClick={() => setOpen(false)}>
                    {items.map((item) => {
                        return (
                            <CategoryItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                child={item.children as ICategoryList[]}
                            />
                        );
                    })}
                </div>
            ) : (
                <>
                    <Link href="/">
                        <li
                            className="mobile-navigator__item"
                            onClick={() => setOpen(false)}
                        >
                            Главная
                        </li>
                    </Link>
                    <Link href="/contacts">
                        <li
                            className="mobile-navigator__item"
                            onClick={() => setOpen(false)}
                        >
                            Контакты
                        </li>
                    </Link>
                    <Link href="/faq">
                        <li
                            className="mobile-navigator__item"
                            onClick={() => setOpen(false)}
                        >
                            F.A.Q.
                        </li>
                    </Link>
                    {rout.pathname === "/search" ? (
                        <>
                            <li
                                className="mobile-navigator__item mobile-navigator__item--category"
                                onClick={() => setCategory(true)}
                            >
                                Категории
                                <Icon>
                                    <RigthArrowIcon />
                                </Icon>
                            </li>
                            <li
                                className="mobile-navigator__item"
                                onClick={() => {
                                    setOpen(false);
                                    dispatch(setLocationModal(true));
                                }}
                            >
                                <Icon width={18} height={18}>
                                    <LocationIcon />
                                </Icon>
                                <span>
                                    {location ? location.name : "Выбор"}
                                </span>
                            </li>
                        </>
                    ) : (
                        <hr className="mobile-navigator__separet" />
                    )}
                    {rout.route === "/search" ? (
                        <li
                            className="mobile-navigator__item"
                            onClick={() => {
                                setOpen(false);
                                dispatch(setSearchOverlay(true));
                            }}
                        >
                            <Icon width={18} height={18}>
                                <SearchIcon />
                            </Icon>
                            Поиск
                        </li>
                    ) : (
                        <Link href={"/search"}>
                            <li
                                className="mobile-navigator__item"
                                onClick={() => setOpen(false)}
                            >
                                <Icon width={18} height={18}>
                                    <SearchIcon />
                                </Icon>
                                Поиск
                            </li>
                        </Link>
                    )}

                    <Link href="/favourite">
                        <li
                            className="mobile-navigator__item"
                            onClick={() => setOpen(false)}
                        >
                            <Icon width={18} height={18}>
                                <HearIcon />
                            </Icon>
                            Избранное
                        </li>
                    </Link>
                    {!!auth ? (
                        <Link href="/my-profile">
                            <li
                                className="mobile-navigator__item"
                                onClick={() => setOpen(false)}
                            >
                                <>
                                    <Avatar
                                        name=""
                                        width={22}
                                        height={22}
                                        placholder={true}
                                        randomColor={false}
                                        url={avatar}
                                    />
                                    <span>Профиль</span>
                                </>
                            </li>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <li
                                className="mobile-navigator__item"
                                onClick={() => setOpen(false)}
                            >
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
                            </li>
                        </Link>
                    )}
                </>
            )}
            <style jsx>{`
                .mobile-navigator {
                    position: absolute;
                    height: 100vh;
                    width: 100%;
                    padding: 30px;
                    background: #fff;
                    transform: translate(-100%, 0);
                    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
                }

                .mobile-navigator--open {
                    transform: none;
                }

                .mobile-navigator__item {
                    padding: 10px 0;
                    font-size: 22px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    column-gap: 10px;
                }

                .mobile-navigator__item--category {
                    padding: 27px 0;
                    align-items: center;
                    justify-content: space-between;
                    border: 1px solid #cfcfcf;
                    border-left: 0;
                    border-right: 0;
                    margin: 22px 0;
                }

                .mobile-navigator__separet {
                    margin: 24px 0;
                }
            `}</style>
        </ul>
    );
}

export default MobileNavigator;
