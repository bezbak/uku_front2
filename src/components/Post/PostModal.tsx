import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import Actions from "../Actions";
import AddImageIcon from "../icons/AddImageIcon";
import Button from "../Buttons/Button";
import CN from "classnames";
import Icon from "../Icon";
import PostForm from "./PostForm";
import getFormDate from "@/utils/getFormData";

interface IPostModalProps {
    onClose: () => void;
    onSubmit: (text: string, images: File[]) => void;
    onImageDelete?: (url: string) => void;
    defaultImages?: string[];
    defaultText?: string;
    descActions?: boolean;
    categoryName?: string;
    locationName?: string;
}

export default function PostModal({
    onClose,
    onSubmit,
    onImageDelete,
    defaultImages = [],
    defaultText = "",
    descActions = false,
    categoryName,
    locationName,
}: IPostModalProps) {
    const [images, setImages] = useState<string[]>(defaultImages);
    const [files, setFiles] = useState<
        {
            link: string;
            file: File;
        }[]
    >([]);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [text, setText] = useState(defaultText);
    const [actions, setActions] = React.useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            const link = URL.createObjectURL(file);
            setImages([...images, link]);
            setFiles([
                ...files,
                {
                    link: link,
                    file: file,
                },
            ]);
        }
    };

    const handleSliceText = (text: string) => {
        return text.slice(text.lastIndexOf(",") + 1);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = getFormDate(event.currentTarget);
        onSubmit(
            data.text as string,
            files.reduce<File[]>((cur, prev) => [...cur, prev.file], [])
        );
    };

    const handleAction = () => {
        setActions(false);
    };

    const handleDeleteImage = (url: string) => {
        const _images = images;
        const _files = files;
        const index = _images.findIndex((link) => link === url);
        const fileindex = _files.findIndex((file) => file.link === url);
        if (index !== -1) {
            _images.splice(index, 1);
            _files.splice(fileindex, 1);
            setImages([..._images]);
            setFiles([..._files]);
            if (onImageDelete) onImageDelete(url);
        }
    };

    useEffect(() => {
        setImages(defaultImages);
    }, [defaultImages]);

    useEffect(() => {
        setSelectedImg(images[0]);
    }, [images]);

    useEffect(() => {
        setText(defaultText);
    }, [defaultText]);

    return (
        <div className="post-modal">
            <div className="post-modal__header">
                <div className="post-view__header-left">
                    <button
                        type="button"
                        className="post-modal__close button-reset-default-styles"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <span>Просмотр</span>
                    <div className="post-view__header-mobile-actions">
                        <button
                            className="post-card__header-button button-reset-default-styles"
                            onClick={() => setActions(!actions)}
                        >
                            <span className="post-card__header-dot"></span>
                            <span className="post-card__header-dot"></span>
                            <span className="post-card__header-dot"></span>
                        </button>
                        <Actions
                            actions={[
                                {
                                    name: "edit",
                                    text: categoryName
                                        ? handleSliceText(categoryName)
                                        : "",
                                },
                                {
                                    name: "delete",
                                    text: locationName
                                        ? handleSliceText(locationName)
                                        : "",
                                },
                            ]}
                            open={actions}
                            onAction={handleAction}
                        />
                    </div>
                </div>
                {descActions && (
                    <div className="post-view__header-right">
                        {!!categoryName && (
                            <Button type="button">
                                {handleSliceText(categoryName)}
                            </Button>
                        )}
                        {!!locationName && (
                            <Button type="button">
                                {handleSliceText(locationName)}
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <div className="post-modal__body">
                <div className="post-modal__preview">
                    {selectedImg && (
                        <img
                            src={selectedImg}
                            alt=""
                            className="post-modal__preview-img"
                        />
                    )}
                </div>
                <div className="post-modal__images">
                    {images?.map((image, index) => (
                        <div
                            key={index + image}
                            style={{
                                position: "relative",
                            }}
                        >
                            <button
                                type="button"
                                className="post-modal__image-delete button-reset-default-styles"
                                onClick={() => handleDeleteImage(image)}
                            >
                                &times;
                            </button>
                            <button
                                className={CN(
                                    "post-modal__image button-reset-default-styles",
                                    {
                                        "post-modal__image--selected":
                                            selectedImg === image,
                                    }
                                )}
                                onClick={() => setSelectedImg(image)}
                            >
                                <img
                                    src={image}
                                    alt=""
                                    className="post-modal__image-img"
                                />
                            </button>
                        </div>
                    ))}
                    <label className="post-modal__text-label">
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hide-elements"
                            name="image"
                            onChange={handleChange}
                        />
                        <div className="post-modal__image-input">
                            <Icon width={22} height={19}>
                                <AddImageIcon />
                            </Icon>
                        </div>
                    </label>
                </div>
                <PostForm onSubmit={handleSubmit} defaultText={text} />
            </div>
            <style jsx>{`
                .post-modal {
                    position: relative;
                    z-index: 2;
                    margin: 0.9em 0;
                    border-radius: 6px;
                    background-color: #fefefe;
                    box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05),
                        0px 1px 5px rgba(0, 0, 0, 0.15);
                }

                .post-modal__header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px;
                    background: #e7e7e7;
                }

                .post-view__header-left {
                    display: flex;
                    align-items: center;
                    column-gap: 32px;
                }

                .post-view__header-mobile-actions {
                    display: none;
                    position: relative;
                }

                .post-view__header-right {
                    display: flex;
                    column-gap: 16px;
                }

                .post-modal__close {
                    font-size: 24px;
                    font-weight: 100;
                }

                .post-modal__body {
                    padding: 24px;
                    font-size: 14px;
                    line-height: 1.5715;
                    word-wrap: break-word;
                    min-width: 80vw;
                }

                .post-modal__preview {
                    min-height: 400px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .post-modal__preview-img {
                    width: 422px;
                    height: 422px;
                    padding: 20px 0;
                    object-fit: cover;
                }

                .post-modal__images {
                    display: flex;
                    align-items: center;
                    margin: 10px 0;
                    column-gap: 8px;
                }

                .post-modal__image-input {
                    cursor: pointer;
                    width: 75px;
                    height: 75px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px dashed #d1d1d1;
                    box-sizing: border-box;
                    border-radius: 6px;
                }

                .post-modal__image {
                    width: 74px;
                    height: 74px;
                    background: #ffffff;
                    border: 1px solid transparent;
                    border-radius: 6px;
                }

                .post-modal__image--selected {
                    border-color: #e56366;
                }

                .post-modal__image-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .post-modal__image-delete {
                    position: absolute;
                    right: 5px;
                    top: 0px;
                    font-size: 17px;
                    line-height: initial;
                }

                @media all and (max-width: 490px) {
                    .post-modal {
                        margin: 0;
                        border-radius: 16px 16px 0px 0px;
                        overflow: hidden;
                        width: 100%;
                    }

                    .post-modal__preview {
                        min-height: unset;
                    }

                    .post-view__header-right {
                        display: none;
                    }

                    .post-modal__header {
                        background: #fff;
                    }

                    .post-view__header-left {
                        width: 100%;
                        justify-content: space-between;
                    }

                    .post-modal__preview {
                        min-height: 288px;
                    }

                    .post-modal__preview-img {
                        padding: 0;
                        width: 288px;
                        height: 288px;
                    }

                    .post-modal__images {
                        flex-wrap: wrap;
                        gap: 8px;
                    }

                    .post-modal__image,
                    .post-modal__image-input {
                        width: 64px;
                        height: 64px;
                    }

                    .post-view__header-mobile-actions {
                        display: block;
                    }
                }

                .post-card__header-actions {
                    display: none;
                }

                .post-card__header-dot {
                    height: 4px;
                    width: 4px;
                    background-color: #000;
                    border-radius: 50%;
                    display: block;
                    margin-bottom: 2px;
                }

                .post-card__header-button {
                    padding: 10px;
                }
            `}</style>
            <style jsx global>{`
                @media all and (max-width: 490px) {
                    .modal .post-modal__scroleble {
                        align-items: end !important;
                    }
                }
            `}</style>
        </div>
    );
}
