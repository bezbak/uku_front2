import "react-day-picker/lib/style.css";

import AccountWrapper from "~/components/Account/AccountWrapper";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { FormEvent } from "react";

function Register() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {};
    const options = [
        { value: "", label: "Выберите пол" },
        { value: "male", label: "Мужской" },
        { value: "female", label: "Женский" },
    ];

    return (
        <AccountWrapper>
            <div className="registration">
                <div>
                    <h3>Регистрация</h3>
                </div>
                <form
                    className="registration__form"
                    onSubmit={(event) => handleSubmit(event)}
                >
                    <input type="text" />
                    <input
                        type="text"
                        placeholder="Фамилия*"
                        name="last_name"
                    />
                    <input type="text" placeholder="Имя*" name="first_name" />
                    <div className="registration__group">
                        <DayPickerInput />
                    </div>
                    {/*Region picker*/}
                    <div className="registration__region">
                        <input
                            placeholder={"Выбор региона"}
                            type="text"
                            readOnly={true}
                        />
                    </div>
                    <div className="registration__checkbox">
                        <input type="checkbox" />
                        <span>Принимаю правила программы лояльности</span>
                    </div>
                    <button className="registration__button">Сохранить</button>
                </form>
                <style jsx>{`
                    .registration {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                    }

                    .registration__form {
                        display: flex;
                        flex-direction: column;
                    }
                `}</style>
            </div>
        </AccountWrapper>
    );
}

export default Register;
