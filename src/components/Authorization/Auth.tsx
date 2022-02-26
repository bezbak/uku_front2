import * as React from "react";

export interface IAuthProps {
    children: React.ReactNode;
}

export default function Auth({ children }: IAuthProps) {
    return (
        <>
            <div className="account-wrapper">
                <img
                    src="/images/loginImage.jpg"
                    className="account-wrapper__img"
                    alt=""
                />
                <div className="account-wrapper__content">{children}</div>
            </div>
            <style jsx>{`
                .account-wrapper {
                    display: grid;
                    align-items: center;
                    grid-template-columns: 50% 50%;
                    height: 100vh;
                    column-gap: 100px;
                }

                .account-wrapper__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .account-wrapper__content {
                    width: 350px;
                }

                @media all and (max-width: 960px) {
                    .account-wrapper {
                        grid-template-columns: auto;
                        justify-content: center;
                    }

                    .account-wrapper__img {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
}
