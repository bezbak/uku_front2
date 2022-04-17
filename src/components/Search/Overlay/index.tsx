import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
    selectSearchVisible,
    setCategoryId,
    setSearchOverlay,
} from "@/app/mainSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Accounts from "./Accounts";
import CN from "classnames";
import Categories from "./Categories";
import Icon from "@/components/Icon";
import Publications from "./Publications";
import SearchIcon from "@/components/icons/SearchIcon";
import Tabs from "./Tabs";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/router";

export default function SearchOverlay() {
    const visible = useAppSelector(selectSearchVisible);
    const searchInput = useRef<HTMLInputElement | null>(null);
    const [tab, setTab] = useState<string>("publication");
    const [searchParams, setSarchParams] = useState<string | null>(null);
    const debouncedSearchTerm = useDebounce(searchParams, 300);
    const dispatch = useAppDispatch();
    const rout = useRouter();

    const appHeight = () => {
        const doc = document.body;
        doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };

    useEffect(() => {
        searchInput.current?.focus();
        window.addEventListener("resize", appHeight);
        appHeight();
        dispatch(setCategoryId(undefined));
        return () => {
            window.removeEventListener("resize", appHeight);
        };
    }, []);

    useEffect(() => {
        if (visible) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }
    }, [visible]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSarchParams(event.currentTarget.value);
    };

    const handleClose = () => {
        dispatch(setSearchOverlay(false));
    };

    useEffect(() => {
        handleClose();
    }, [rout]);

    return (
        <div>
            <div
                className={CN("search-overlay", {
                    "search-overlay--visible": visible,
                })}
            >
                <div className="search-overlay__inner">
                    <div className="search-overlay__header search-header">
                        <div className="search-header__inner">
                            <div className="search-header__wrapper">
                                <div className="search-header__inner-wrap">
                                    <form className="search-header__form">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="search-header__input"
                                            placeholder="Поиск"
                                            ref={searchInput}
                                            onChange={handleChange}
                                        />
                                        <div className="search-header__icon">
                                            <Icon>
                                                <SearchIcon />
                                            </Icon>
                                        </div>
                                    </form>
                                    <button
                                        type="button"
                                        className="search-header__close button-reset-default-styles"
                                        onClick={handleClose}
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="search-header__tabs">
                            <Tabs
                                tabs={[
                                    {
                                        name: "publication",
                                        text: "Публикации",
                                    },
                                    {
                                        name: "account",
                                        text: "Аккаунты",
                                    },
                                    {
                                        name: "category",
                                        text: "Категории",
                                    },
                                ]}
                                active={tab}
                                onTab={(tab) => setTab(tab)}
                            />
                        </div>
                    </div>
                    <div className="search-overlay__body">
                        <div className="search-overlay__content">
                            {visible && (
                                <>
                                    {
                                        {
                                            publication: (
                                                <Publications
                                                    params={debouncedSearchTerm}
                                                />
                                            ),
                                            account: (
                                                <Accounts
                                                    params={debouncedSearchTerm}
                                                />
                                            ),
                                            category: (
                                                <Categories
                                                    params={debouncedSearchTerm}
                                                />
                                            ),
                                        }[tab]
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .search-overlay {
                        display: none;
                        position: fixed;
                        top: 0.25rem;
                        left: 0.25rem;
                        width: 100vw;
                        z-index: 2000;
                        background: #f9fafb;
                        height: var(--app-height, 100vh);
                        transform: scale(1.1);
                        border-radius: 5px;
                        overflow: hidden;
                        will-change: transform;
                        opacity: 0;
                        box-shadow: 0 4px 30px rgb(0 0 0 / 25%);
                    }

                    .search-overlay--visible {
                        display: block;
                        opacity: 1;
                        transform: scale(1);
                        animation-name: fadeInOpacity;
                        animation-iteration-count: 1;
                        animation-timing-function: linear;
                        animation-duration: 0.1s;
                    }

                    .search-header__wrapper {
                        background: #fff;
                        box-shadow: 0 5px 50px rgb(0 0 0 / 3%);
                    }

                    .search-header__inner-wrap {
                        max-width: 1200px;
                        margin-left: auto;
                        margin-right: auto;
                        padding-left: 1rem;
                        padding-right: 1rem;
                        height: 60px;
                        position: relative;
                    }

                    .search-header__form {
                        position: absolute;
                        bottom: 0;
                        left: 1rem;
                        width: calc(100% - 2rem);
                    }

                    .search-header__input {
                        width: 100%;
                        display: block;
                        appearance: none;
                        height: 60px;
                        font-size: 1.125rem;
                        border: 0;
                        outline: 0;
                        box-shadow: none;
                        font-weight: 400;
                        padding: 0 1rem 0 2rem;
                        background: transparent;
                        margin: 0;
                        color: #6c7987;
                    }

                    .search-header__icon {
                        font-size: 1.5rem;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 0;
                        color: #a5b4c4;
                    }

                    .search-header__close {
                        font-size: 2rem;
                        font-weight: 300;
                        position: absolute;
                        right: 0;
                        width: 50px;
                        height: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                    }

                    .search-overlay__body {
                        padding: 20px;
                        width: 100vw;
                        height: 75vh;
                        overflow: auto;
                        padding-top: 2rem;
                    }

                    .search-header__tabs {
                        padding: 0 20px;
                        background: #fff;
                    }

                    @media all and (max-width: 450px) {
                        .search-header__inner-wrap {
                            height: 40px;
                        }
                        .search-header__input {
                            height: 40px;
                        }
                    }
                `}
            </style>
        </div>
    );
}
