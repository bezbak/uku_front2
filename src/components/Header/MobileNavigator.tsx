import React, { useEffect, useState } from "react";

import CN from "classnames";
import { CategoryItem } from "../Search/Category/CategoryItem";
import { HearIcon } from "../icons/HeartIcon";
import Icon from "../Icon";
import Link from "next/link";
import LocationIcon from "../icons/LocationIcon";
import RigthArrowIcon from "../icons/RightArrowIcon";
import SearchIcon from "../icons/SearchIcon";
import { selectCategory } from "../Search/Category/CategorySlice";
import { useAppSelector } from "@/app/hooks";
import { useGetToken } from "@/hooks/useGetToken";
import { useRouter } from "next/router";

function MobileNavigator({
    open = false,
    setOpen,
}: {
    open: boolean;
    setOpen: (opne: boolean) => void;
}) {
    const auth = useGetToken();
    const rout = useRouter();
    const [category, setCategory] = useState(false);
    const items = useAppSelector(selectCategory);

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
                items.map((item) => {
                    return <CategoryItem item={item} key={item.id} />;
                })
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
                                onClick={() => setOpen(false)}
                            >
                                <Icon width={18} height={18}>
                                    <LocationIcon />
                                </Icon>
                                Уфа
                            </li>
                        </>
                    ) : (
                        <hr className="mobile-navigator__separet" />
                    )}
                    <Link href="/search">
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
                                Профиль
                            </li>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <li
                                className="mobile-navigator__item"
                                onClick={() => setOpen(false)}
                            >
                                Войти
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
