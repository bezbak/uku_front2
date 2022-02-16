import "react-phone-input-2/lib/style.css";

import { FormEvent, useState } from "react";

import AccountWrapper from "~/components/Account/AccountWrapper";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";

function Login() {
    const [error, setError] = useState(false);
    const onChangePhone = (number: string) => {
        setError(true);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
        <AccountWrapper>
            <div className="login">
                <div className="login__header">
                    <h3>Вход</h3>
                    <Link href={"/"}>
                        <button className="login__button">Отмена</button>
                    </Link>
                </div>
                <form
                    onSubmit={(event) => handleSubmit(event)}
                    className="login__form"
                >
                    {error && (
                        <span className="login__error">
                            Проверьте правильность введенного номера
                        </span>
                    )}
                    <PhoneInput
                        country={"kg"}
                        inputProps={{
                            required: true,
                            name: "phone",
                            autoFocus: true,
                            maxLength: 16,
                        }}
                        placeholder="Номер"
                        inputClass="login__form-input"
                        dropdownClass="login__form-dropdown"
                        onChange={(num) => onChangePhone(num)}
                    />
                    <button type="submit" className="login__next">
                        Далее
                    </button>
                </form>
                <style jsx global>{`
                    .login__header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 28px;
                    }

                    .login__error {
                        display: block;
                        margin-bottom: 10px;
                        color: #d61414;
                        font-size: 13px;
                    }

                    .login__button {
                        border: none;
                        background: none;
                        color: #e56366;
                        cursor: pointer;
                    }
                    .login__next {
                        margin-top: 10px;
                        width: 100%;
                        padding: 10px;
                        border-radius: 6px;
                        height: 50px;
                        background-color: #e56366;
                        color: #ffffff;
                        border: none;
                        cursor: pointer;
                    }

                    .login__form .login__form-input {
                        width: 100%;
                        height: 44px;
                    }

                    .login__form .login__form-dropdown {
                        border-right: 0;
                        background: #fff;
                    }
                `}</style>
            </div>
        </AccountWrapper>
    );
}

export default Login;
