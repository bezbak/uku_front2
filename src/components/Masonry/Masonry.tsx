import Bricks, { Instance, SizeDetail } from "bricks.js";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface IMasonryProps {
    children: ReactNode;
    sizes: SizeDetail[];
    position?: boolean;
    onUpdate?: () => void;
}

export default function Masonry({
    children,
    sizes,
    position = true,
    onUpdate,
}: IMasonryProps) {
    const [masonry, setMasonry] = useState<Instance | null>(null);
    const masonryElement = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (masonryElement.current) {
            setMasonry(
                Bricks({
                    container: masonryElement.current,
                    packed: "data-packed",
                    sizes,
                    position,
                })
            );
        }
        masonry?.resize(true).pack();
    }, [masonryElement]);

    const handleLoad = () => {
        if (onUpdate) onUpdate();
        masonry?.pack().resize(true).update();
    };

    return (
        <>
            <div className="gw-masonry">
                <div
                    className="gw-masonry__list"
                    ref={masonryElement}
                    onLoad={handleLoad}
                >
                    {children}
                </div>
            </div>
            <style jsx>
                {`
                    .gw-masonry__list {
                        margin: 0 auto;
                    }
                `}
            </style>
        </>
    );
}
