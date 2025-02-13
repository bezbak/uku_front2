import React, { ReactNode } from "react";

import Container from "./Container";

const Wrapper = ({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) => {
    return (
        <div className="wrapper">
            <Container>
                <div className="wrapper__inner">
                    <h1 className="wrapper__title">{title}</h1>
                    <div className="wrapper__content">{children}</div>
                </div>
            </Container>
            <style jsx>
                {`
                    .wrapper {
                        min-height: 70vh;
                    }

                    .wrapper__inner {
                        margin-top: 32px;
                    }

                    .wrapper__title {
                        margin-bottom: 24px;
                        font-weight: 500;
                        color: #121213;
                    }
                `}
            </style>
        </div>
    );
};

export default Wrapper;
