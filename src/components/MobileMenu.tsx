import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Icon from "./Icon";
import { HearIcon } from "./icons/HeartIcon";
import HomeIcon from "./icons/HomeIcon";
import MenuSearchIcon from "./icons/MenuSearchIcon";
import CN from "classnames";
import { useGetToken } from "@/hooks/useGetToken";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCategoryId, setAuthConfirm } from "@/app/mainSlice";

export default function MobileMenu() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const categoryId = useAppSelector(selectCategoryId);

    const openProfile = () => {
        const auth = useGetToken();
        if (auth) {
            router.push("/my-profile");
        } else {
            dispatch(setAuthConfirm(true));
        }
    };

    const openFavorite = () => {
        const auth = useGetToken();
        if (auth) {
            router.push("/favourite");
        } else {
            dispatch(setAuthConfirm(true));
        }
    };

    return (
        <div
            className={CN("footer-menu", {
                "footer-menu--hide": categoryId !== undefined,
            })}
        >
            <div className="footer-menu__inner">
                <ul className="list-reset-default-styles footer-menu__list">
                    <li className="footer-menu__item">
                        <Link href="/">
                            <a
                                className={CN("footer-menu__link", {
                                    "footer-menu__link--active":
                                        router.pathname === "/",
                                })}
                            >
                                <span className="footer-menu__icon">
                                    <Icon>
                                        <HomeIcon />
                                    </Icon>
                                </span>
                                <span className="footer-menu__text">
                                    Главная
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li className="footer-menu__item">
                        <Link href="/search">
                            <a
                                className={CN("footer-menu__link", {
                                    "footer-menu__link--active":
                                        router.pathname === "/search",
                                })}
                            >
                                <span className="footer-menu__icon">
                                    <Icon>
                                        <MenuSearchIcon />
                                    </Icon>
                                </span>
                                <span className="footer-menu__text">
                                    Категории
                                </span>
                            </a>
                        </Link>
                    </li>
                    <li className="footer-menu__item">
                        <button
                            className={CN(
                                "footer-menu__link button-reset-default-styles",
                                {
                                    "footer-menu__link--active":
                                        router.pathname === "/favourite",
                                }
                            )}
                            onClick={openFavorite}
                        >
                            <span className="footer-menu__icon">
                                <Icon>
                                    <HearIcon />
                                </Icon>
                            </span>
                            <span className="footer-menu__text">Избранное</span>
                        </button>
                    </li>
                    <li className="footer-menu__item">
                        <button
                            className={CN(
                                "footer-menu__link button-reset-default-styles",
                                {
                                    "footer-menu__link--active":
                                        router.pathname === "/my-profile",
                                }
                            )}
                            onClick={openProfile}
                        >
                            <span className="footer-menu__icon">
                                <Icon>
                                    <path
                                        d="M25 29.8C38.2544 29.8 49 34.8144 49 41V49H1V41C1 34.8144 11.7456 29.8 25 29.8ZM45.8 41C45.8 36.584 36.488 33 25 33C13.512 33 4.2 36.584 4.2 41V45.8H45.8V41ZM25 1C27.9704 1 30.8192 2.18 32.9196 4.2804C35.02 6.38081 36.2 9.22958 36.2 12.2C36.2 15.1704 35.02 18.0192 32.9196 20.1196C30.8192 22.22 27.9704 23.4 25 23.4C22.0296 23.4 19.1808 22.22 17.0804 20.1196C14.98 18.0192 13.8 15.1704 13.8 12.2C13.8 9.22958 14.98 6.38081 17.0804 4.2804C19.1808 2.18 22.0296 1 25 1ZM25 4.2C22.8783 4.2 20.8434 5.04285 19.3431 6.54315C17.8429 8.04344 17 10.0783 17 12.2C17 14.3217 17.8429 16.3566 19.3431 17.8569C20.8434 19.3571 22.8783 20.2 25 20.2C27.1217 20.2 29.1566 19.3571 30.6569 17.8569C32.1571 16.3566 33 14.3217 33 12.2C33 10.0783 32.1571 8.04344 30.6569 6.54315C29.1566 5.04285 27.1217 4.2 25 4.2V4.2Z"
                                        fill="currentColor"
                                        stroke="currentColor"
                                        strokeWidth="0.260099"
                                    />
                                </Icon>
                            </span>
                            <span className="footer-menu__text">Профиль</span>
                        </button>
                    </li>
                </ul>
            </div>
            <style jsx>{`
                .footer-menu__inner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: none;
                    box-shadow: 0 0 15px 0 rgb(10 19 49 / 10%);
                    background-color: #ffffff;
                    width: 100%;
                    padding: 15px 0 15px;
                    transition: 0.5s;
                    z-index: 99;
                    height: 70px;
                }

                .footer-menu__list {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                }

                .footer-menu__item {
                    width: 20%;
                    text-align: center;
                }

                .footer-menu__link {
                    display: inline-block;
                    text-decoration: none;
                    transition: 0.2s;
                    color: #989797;
                    font-size: 10px;
                }

                .footer-menu__link--active {
                    color: #e56366;
                }

                .footer-menu__icon {
                    margin-bottom: 8px;
                    display: inline-block;
                }

                .footer-menu__text {
                    display: block;
                    font-size: 10px;
                    line-height: 1;
                    font-weight: 400;
                }

                .footer-menu--hide {
                    display: none;
                }

                @media all and (max-width: 710px) {
                    .footer-menu__inner {
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
}
