import CN from "classnames";
import { FC } from "react";

interface CheckboxProps {
    error: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ error }) => {
    return (
        <label htmlFor="checkbox" className="checkbox-wrapper">
            <input
                id="checkbox"
                type="checkbox"
                name="rule"
                className={"hide-elements checkbox"}
            />
            <div
                className={CN("checkbox__checkmark", {
                    "checkbox--error": error,
                })}
            />
            <style jsx>{`
                .checkbox-wrapper {
                    display: inline-block;
                    position: relative;
                    height: 20px;
                    width: 20px;
                    vertical-align: middle;
                    cursor: pointer;
                    font-size: 22px;
                    user-select: none;
                }

                .checkbox__checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 20px;
                    width: 20px;
                    border: 1.6px solid #667689;
                    box-sizing: border-box;
                    border-radius: 4px;
                }

                .checkbox-wrapper:hover .checkbox ~ .checkbox__checkmark {
                    border-color: #1890ff;
                }

                .checkbox-wrapper .checkbox:checked ~ .checkbox__checkmark {
                    background-color: #1890ff;
                }

                .checkbox-wrapper .checkbox--error {
                    border-color: red;
                }

                .checkbox__checkmark:before {
                    content: "";
                    position: absolute;
                    opacity: 0;
                    left: 50%;
                    top: 40%;
                    width: 5px;
                    height: 10px;
                    border: solid white;
                    border-width: 0 3px 3px 0;
                    transform: translate(-50%, -50%) rotate(45deg);
                }

                .checkbox-wrapper
                    .checkbox:checked
                    ~ .checkbox__checkmark:before {
                    opacity: 1;
                }
            `}</style>
        </label>
    );
};

export default Checkbox;
