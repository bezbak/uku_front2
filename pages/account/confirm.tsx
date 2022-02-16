import AccountWrapper from "~/components/Account/AccountWrapper";
import { useState } from "react";

function Confirm() {
    const [code, setCode] = useState("");
    const phone = 1;
    const confirmCode = () => {};
    const resendCode = () => {};
    const time = 3;
    return (
        <AccountWrapper>
            <div className="confirm">
                <h3>Подтверждение кода</h3>
                <p>Код был отправлен на номер</p>
                <span className="confirm__phone">
                    {phone}
                    <span className="confirm__incorrect">Неверный номер?</span>
                </span>
                <input
                    onChange={({ target: { value } }) => setCode(value)}
                    type="text"
                    className="confirm__input"
                    placeholder={"Код"}
                />
                <button
                    disabled={!code}
                    onClick={() => confirmCode()}
                    className="confirm__button"
                >
                    Подтвердить
                </button>
                <div className="confirm__resend">
                    <p>Не пришло SMS сообщение?</p>
                    <button onClick={() => resendCode()} disabled={!!time}>
                        {time ? (
                            <div>
                                Переотправить через <span>{time}</span>
                            </div>
                        ) : (
                            "Отправить"
                        )}
                    </button>
                </div>
            </div>
        </AccountWrapper>
    );
}

export default Confirm;
