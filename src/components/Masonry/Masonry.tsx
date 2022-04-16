import Bricks, { Instance, SizeDetail } from "bricks.js";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface IMasonryProps {
    children: ReactNode;
    sizes: SizeDetail[];
    position?: boolean;
    onUpdate?: () => void;
    onInit?: (masonry: Instance) => void;
}

export default function Masonry({
    children,
    sizes,
    position = true,
    onUpdate,
    onInit,
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
        if (masonry && onInit) {
            onInit(masonry);
        }
        destroy(window.innerWidth);
    };

    const destroy = (width: number) => {
        if (width <= 460) {
            masonry?.resize(false);
            masonryElement.current?.removeAttribute("style");
            if (masonryElement.current)
                Array.from(masonryElement.current.children).forEach(
                    (element) => {
                        element.removeAttribute("style");
                    }
                );
        } else {
            setTimeout(() => {
                masonry?.resize(true).pack();
            }, 0);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", (event: Event) => {
            const target = event.target as Window;
            destroy(target.innerWidth);
        });
    }, []);

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

                    @media all and (max-width: 460px) {
                        .gw-masonry__list {
                            display: flex;
                            flex-wrap: wrap;
                            row-gap: 20px;
                        }
                    }
                `}
            </style>
        </>
    );
}
