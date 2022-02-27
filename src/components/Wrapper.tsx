import Container from "./Container";
import { ReactNode } from "react";

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
                    <h2 className="wrapper__title">{title}</h2>
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
