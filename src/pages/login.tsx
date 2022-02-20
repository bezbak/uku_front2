import Confirm from "@/components/Authorization/Confirm";
import Register from "@/components/Authorization/Register";
import { default as _Login } from "@/components/Authorization/Login";
import {
    selectAuth,
    selectConfirmStatus,
    selectMessage,
    selectStatus,
} from "@/components/Authorization/authSlice";
import { useAppSelector } from "@/app/hooks";

export default function Login() {
    const auth = useAppSelector(selectAuth);
    const status = useAppSelector(selectStatus);
    const message = useAppSelector(selectMessage);
    const confirmStatus = useAppSelector(selectConfirmStatus);
    return (
        <>
            <div className="account-wrapper">
                <img
                    src="/images/loginImage.jpg"
                    className="account-wrapper__img"
                    alt=""
                />
                <div className="account-wrapper__content">
                    {
                        {
                            login: <_Login status={status} message={message} />,
                            confirm: (
                                <Confirm
                                    status={status}
                                    confirmStatus={confirmStatus}
                                    message={message}
                                />
                            ),
                            register: <Register status={status} />,
                        }[auth]
                    }
                </div>
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
