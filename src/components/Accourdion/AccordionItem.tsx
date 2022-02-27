import * as React from "react";

import CN from "classnames";
import Icon from "../Icon";
import RigthArrowIcon from "../icons/RightArrowIcon";

export interface IAccardionItemProps {
    faq: {
        id: number;
        question: string;
        answer: string;
    };
}

export default function AccardionItem({ faq }: IAccardionItemProps) {
    const [active, setActive] = React.useState(false);
    return (
        <>
            <li
                className={CN("accordion-item", {
                    "accordion-item--active": active,
                })}
                onClick={() => setActive(!active)}
            >
                <div className="accordion-item__wrap">
                    <h2 className="accordion-item__title">{faq.question}</h2>
                    <button
                        type="button"
                        className="accordion-item__arrow button-reset-default-styles"
                    >
                        <Icon>
                            <RigthArrowIcon></RigthArrowIcon>
                        </Icon>
                    </button>
                </div>
                <p className="accordion-item__desc">{faq.answer}</p>
            </li>
        </>
    );
}
