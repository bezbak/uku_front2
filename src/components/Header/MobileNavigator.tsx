import CN from "classnames";
import { HearIcon } from "../icons/HeartIcon";
import Icon from "../Icon";
import Link from "next/link";
import LocationIcon from "../icons/LocationIcon";
import React from "react";
import SearchIcon from "../icons/SearchIcon";
import { useGetToken } from "@/hooks/useGetToken";

function MobileNavigator({ open = false }: { open: boolean }) {
    const auth = useGetToken();
    return (
        <ul
            className={CN("mobile-navigator list-reset-default-styles", {
                "mobile-navigator--open": open,
            })}
        >
            <hr />
            <Link href="/">
                <li className="mobile-navigator__item">Главная</li>
            </Link>
            <Link href="/contacts">
                <li className="mobile-navigator__item">Контакты</li>
            </Link>
            <Link href="/faq">
                <li className="mobile-navigator__item">F.A.Q.</li>
            </Link>
            <hr />
            <Link href={"/search"}>
                <li className="mobile-navigator__item">Категории</li>
            </Link>
            <Link href={"/search"}>
                <li className="mobile-navigator__item">Новости</li>
            </Link>

            <hr />
            <li className="mobile-navigator__item">
                <Icon width={18} height={18}>
                    <LocationIcon />
                </Icon>
                Уфа
            </li>
            <Link href="/search">
                <li className="mobile-navigator__item">
                    <Icon width={18} height={18}>
                        <SearchIcon />
                    </Icon>
                    Поиск
                </li>
            </Link>

            <Link href="/favourite">
                <li className="mobile-navigator__item">
                    <Icon width={18} height={18}>
                        <HearIcon />
                    </Icon>
                    Избранное
                </li>
            </Link>
            {!!auth ? (
                <Link href="/myProfile">
                    <li className="mobile-navigator__item">Профиль</li>
                </Link>
            ) : (
                <Link href="/login">
                    <li className="mobile-navigator__item">Войти</li>
                </Link>
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
                }
            `}</style>
        </ul>
    );
}

export default MobileNavigator;
