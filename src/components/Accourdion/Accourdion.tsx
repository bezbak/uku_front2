import * as React from "react";

interface IAccordionProps {
    children: React.ReactNode;
}

const Accordion: React.FunctionComponent<IAccordionProps> = ({ children }) => {
    return (
        <>
            <ul className="accordion">{children}</ul>
            <style jsx global>{`
                .accordion {
                    list-style: none;
                }

                .accordion-item {
                    position: relative;
                    padding: 17px 16px;
                    margin-bottom: 12px;
                    background: #fefefe;
                    border: 1px solid #e9e9e9;
                    border-radius: 6px;
                    cursor: pointer;
                }

                .accordion-item__checkbox {
                    position: absolute;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                }

                .accordion-item--active .accordion-item__desc {
                    height: auto;
                    opacity: 1;
                    margin-top: 12px;
                }

                .accordion-item__title {
                    font-size: 16px;
                    color: #3e3e3e;
                }

                .accordion-item__desc {
                    word-break: break-all;
                    font-size: 14px;
                    line-height: 140%;
                    color: #3e3e3e;
                    height: 0;
                    opacity: 0;
                }

                .accordion-item__wrap {
                    display: flex;
                    justify-content: space-between;
                }

                .accordion-item__arrow {
                    color: #e56366;
                }

                .accordion-item--active .accordion-item__arrow {
                    color: #e56366;
                    transform: rotateZ(90deg);
                }
            `}</style>
        </>
    );
};

export default Accordion;
