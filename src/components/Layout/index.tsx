import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <main className="main">{children}</main>
            <style jsx>{`
                .main {
                    min-height: 100vh;
                    position: relative;
                }
            `}</style>
        </>
    );
}
