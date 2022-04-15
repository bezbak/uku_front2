import React, { useEffect, useState } from "react";
import { getAvatarAsync, selectAvatar } from "../MyProfile/ProfileSlice";
import {
    selectCategoryId,
    selectLocation,
    setCategoryId,
    setLocationModal,
    setSearchOverlay,
} from "@/app/mainSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Container from "../Container";
import HeaderNavbar from "./HeaderNavbar";
import Icon from "../Icon";
import Link from "next/link";
import MobileNavigator from "./MobileNavigator";
import SearchIcon from "../icons/SearchIcon";
import TopBar from "./TopBar";
import { useGetToken } from "@/hooks/useGetToken";
import { useRouter } from "next/router";
import LocationIcon from "../icons/LocationIcon";
import RigthArrowIcon from "../icons/RightArrowIcon";

const Header = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const avatar = useAppSelector(selectAvatar);
    const auth = useGetToken();
    const router = useRouter();
    const location = useAppSelector(selectLocation);
    const categoryId = useAppSelector(selectCategoryId);

    useEffect(() => {
        if (auth) dispatch(getAvatarAsync());
    }, []);

    useEffect(() => {
        if (router.pathname !== "/search") {
            dispatch(setCategoryId(undefined));
        }
    }, [router.pathname]);

    const handleBack = () => {
        if (categoryId === undefined) {
            router.back();
        } else {
            dispatch(setCategoryId(undefined));
        }
    };

    return (
        <div className="header">
            <div className="header__main">
                <TopBar />
                <HeaderNavbar avatar={avatar} />
            </div>
            <div className="header__mobile mobile">
                <Container>
                    <div className="mobile__inner">
                        {router.pathname !== "/search" && (
                            <Link href="/">
                                <h2 className="mobile__logo">Uku.kg</h2>
                            </Link>
                        )}
                        {router.pathname === "/search" && (
                            <>
                                <button
                                    type="button"
                                    className="mobile__back button-reset-default-styles"
                                    onClick={handleBack}
                                >
                                    <Icon width={24} height={24}>
                                        <RigthArrowIcon />
                                    </Icon>
                                </button>
                                <button
                                    className="button-reset-default-styles mobile__location"
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
                                </button>
                            </>
                        )}
                        <button
                            type="button"
                            className="button-reset-default-styles"
                            onClick={() => dispatch(setSearchOverlay(true))}
                        >
                            <Icon width={24} height={24}>
                                <SearchIcon />
                            </Icon>
                        </button>
                    </div>
                </Container>
                <MobileNavigator
                    open={open}
                    setOpen={setOpen}
                    avatar={avatar}
                />
            </div>
            <style jsx>{`
                .header {
                    min-height: 80px;
                }

                .header__mobile {
                    display: none;
                    position: fixed;
                    z-index: 50;
                    width: 100%;
                    background: #fff;
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

                .mobile__logo {
                    cursor: pointer;
                }

                .mobile__location {
                    padding: 10px 0;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    column-gap: 10px;
                }

                .mobile__back {
                    transform: rotate(180deg);
                }

                @media all and (max-width: 710px) {
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
