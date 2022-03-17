import {
    selectMessageConfirm,
    selectStatusConfirm,
} from "@/components/MyProfile/ConfirmSlice";

import Auth from "@/components/Authorization/Auth";
import Login from "@/components/Authorization/Login";
import React from "react";
import { useAppSelector } from "@/app/hooks";

export default function NewPhone() {
    const status = useAppSelector(selectStatusConfirm);
    const message = useAppSelector(selectMessageConfirm);
    return (
        <Auth>
            <Login status={status} message={message} type="new" />
        </Auth>
    );
}
