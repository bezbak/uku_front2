import CN from "classnames";
import React from "react";

interface ITabsProps {
    tabs: {
        name: string;
        text: string;
    }[];
    onTab: (tab: string) => void;
    active: string;
}

export default function Tabs({ tabs, onTab, active }: ITabsProps) {
    return (
        <div className="tabs">
            {tabs.map((tab, index) => (
                <button
                    key={index + tab.name}
                    type="button"
                    className={CN("button-reset-default-styles tabs__button", {
                        "tabs__button--active": active === tab.name,
                    })}
                    onClick={() => onTab(tab.name)}
                >
                    {tab.text}
                </button>
            ))}
            <style jsx>{`
                .tabs__button {
                    padding: 10px;
                    border-bottom: 2px solid transparent;
                }

                .tabs__button--active {
                    border-color: red;
                }

                .tabs {
                    background: #fff;
                }

                @media all and (max-width: 450px) {
                    .tabs__button {
                        font-size: 13px;
                    }
                }
            `}</style>
        </div>
    );
}
