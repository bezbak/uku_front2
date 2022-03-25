import CN from "classnames";
import React from "react";

export default function Actions({
    actions,
    open,
    onAction,
}: {
    actions: {
        name: string;
        text: string;
    }[];
    open: boolean;
    onAction: (action: string) => void;
}) {
    return (
        <div
            className={CN("actions", {
                "actions--open": open,
            })}
        >
            <div className="actions__list">
                <ul className="actions__list-actions">
                    {actions.map((action, index) => (
                        <li
                            className="actions__item"
                            key={index + action.name}
                            onClick={() => onAction(action.name)}
                        >
                            <button className="actions__item-btn button-reset-default-styles">
                                {action.text}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <style jsx>{`
                .actions {
                    display: none;
                    position: absolute;
                    z-index: 100;
                    overflow: auto;
                    background: #fff;
                    bottom: -3px;
                    right: 0;
                    transform: translateY(100%);
                }

                .actions--open {
                    display: block;
                }

                .actions__list-actions {
                    margin: 0;
                    padding: 5px 0;
                }

                .actions__item {
                    display: block;
                    position: relative;
                    width: 100%;
                    margin: 0;
                    padding: 0.7em 1.1em;
                    border: 0px solid transparent;
                    border-radius: 3px;
                    background: none;
                    color: inherit;
                    color: #000;
                    font-size: 0.9em;
                    text-align: left;
                    text-decoration: none;
                    white-space: nowrap;
                    cursor: pointer;
                    appearance: none;
                }
            `}</style>
        </div>
    );
}
