import Container from "../Container";
import Link from "next/link";
import React from "react";

const TopBar = () => {
    return (
        <div className="top-bar">
            <Container>
                <ul className="top-bar__list list-reset-default-styles">
                    <Link href={"/"}>
                        <li className="top-bar__item">Главная</li>
                    </Link>
                    <Link href={"/contacts"}>
                        <li className="top-bar__item">Контакты</li>
                    </Link>
                    <Link href={"/faq"}>
                        <li className="top-bar__item">F.A.Q.</li>
                    </Link>
                </ul>
            </Container>
            <style jsx>{`
                .top-bar {
                    padding: 19px 0;
                    box-shadow: inset 0px -1px 0px rgb(0 0 0 / 5%);
                }

                .top-bar__list {
                    display: flex;
                    column-gap: 19px;
                }

                .top-bar__item {
                    cursor: pointer;
                    font-size: 15px;
                    color: #4f4f4f;
                }
            `}</style>
        </div>
    );
};

export default TopBar;
