import Link from "next/link";
import * as React from "react";

export default function Logo() {
    return (
        <div className="logo">
            <Link href={"/"}>
                <img src="/images/logo.png" alt="" />
            </Link>
            <style jsx>{`
                .logo {
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
