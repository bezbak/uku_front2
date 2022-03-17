import React, { useState } from "react";

import Container from "../Container";
import HeaderNavbar from "./HeaderNavbar";
import Icon from "../Icon";
import Link from "next/link";
import MobileNavigator from "./MobileNavigator";
import SearchIcon from "../icons/SearchIcon";
import TopBar from "./TopBar";

const Header = () => {
    const [open, setOpen] = useState(false);
    const handleChange = () => {
        setOpen(!open);
    };
    return (
        <div className="header">
            <div className="header__main">
                <TopBar />
                <HeaderNavbar />
            </div>
            <div className="header__mobile mobile">
                <Container>
                    <div className="mobile__inner">
                        <label className="burger">
                            <input
                                type="checkbox"
                                className="hide-elements burger__checkbox"
                                onChange={handleChange}
                                checked={open}
                            />
                            <span className="burger__item" />
                            <span className="burger__item" />
                            <span className="burger__item" />
                        </label>
                        <Link href="/">
                            <h2>Uku.kg</h2>
                        </Link>
                        <button
                            type="button"
                            className="button-reset-default-styles"
                        >
                            <Icon width={24} height={24}>
                                <SearchIcon />
                            </Icon>
                        </button>
                    </div>
                </Container>
                <MobileNavigator open={open} />
            </div>
            <style jsx>{`
                .header {
                    min-height: 80px;
                }

                .header__mobile {
                    display: none;
                    position: fixed;
                    z-index: 100;
                    width: 100%;
                }

                .mobile__inner {
                    display: flex;
                    width: 100%;
                    background: #ffffff;
                    justify-content: space-between;
                    align-items: center;
                    padding: 19px 0;
                    box-shadow: inset 0px -1px 0px rgb(0 0 0 / 5%);
                }

                .burger {
                    width: 40px;
                    height: 32px;
                    cursor: pointer;
                }

                .burger__item {
                    display: block;
                    width: 33px;
                    height: 4px;
                    margin-bottom: 5px;
                    background: #000000;
                    border-radius: 3px;
                    z-index: 1;
                    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
                        opacity 0.55s ease;
                }

                .burger__checkbox ~ .burger__item {
                    transform-origin: 0% 100%;
                    opacity: 1;
                }

                .burger__checkbox:checked ~ .burger__item:nth-child(2) {
                    transform: rotate(45deg) translate(0px, 0px);
                }

                .burger__checkbox:checked ~ .burger__item:nth-child(3) {
                    opacity: 0;
                }

                .burger__checkbox:checked ~ .burger__item:nth-child(4) {
                    transform: rotate(-45deg) translate(-2px, 5px);
                }

                @media all and (max-width: 960px) {
                    .header__main {
                        display: none;
                    }

                    .header__mobile {
                        display: block;
                    }
                }
            `}</style>
        </div>
    );
};

export default Header;
