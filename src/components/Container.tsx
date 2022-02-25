import { FC, ReactNode } from "react";

export interface IContainerProps {
    children: ReactNode;
}
const Container: FC<IContainerProps> = ({ children }) => {
    return (
        <>
            <div className="container">{children}</div>
            <style jsx>{`
                .container {
                    padding: 0 20px;
                }
            `}</style>
        </>
    );
};

export default Container;
