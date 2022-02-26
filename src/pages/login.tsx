import {
    selectAuth,
    selectConfirmStatus,
    selectMessage,
    selectPhone,
    selectStatus,
} from "@components/Authorization/authSlice";

import Auth from "@/components/Authorization/Auth";
import Confirm from "@/components/Authorization/Confirm";
import Register from "@/components/Authorization/Register";
import { default as _Login } from "@/components/Authorization/Login";
import { useAppSelector } from "@/app/hooks";

export default function Login() {
    const auth = useAppSelector(selectAuth);
    const status = useAppSelector(selectStatus);
    const message = useAppSelector(selectMessage);
    const confirmStatus = useAppSelector(selectConfirmStatus);
    const phone = useAppSelector(selectPhone);
    return (
        <Auth>
            <>
                {
                    {
                        login: (
                            <_Login
                                status={status}
                                message={message}
                                type="login"
                            />
                        ),
                        confirm: (
                            <Confirm
                                status={status}
                                confirmStatus={confirmStatus}
                                message={message}
                                type="login"
                            />
                        ),
                        register: <Register status={status} />,
                    }[auth]
                }
            </>
        </Auth>
    );
}
