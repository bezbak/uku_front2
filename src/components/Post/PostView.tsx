import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import AddImageIcon from "../icons/AddImageIcon";
import CN from "classnames";
import Icon from "../Icon";
import PostForm from "./PostForm";
import getFormDate from "@/utils/getFormData";
import { postImageUploadAsync } from "./PostSlice";
import { useAppDispatch } from "@/app/hooks";

interface IPostViewprops {
    defaultFile: {
        link: string;
        file: File;
    };
    defaultImage: string;
    defaultText: string;
    onClose: () => void;
    onSubmit: (text: string, images: number[]) => void;
}

export default function PostView({
    defaultImage,
    defaultFile,
    defaultText,
    onClose,
    onSubmit,
}: IPostViewprops) {
    const [images, setImages] = useState([defaultImage]);
    const [selectedImg, setselectedImg] = useState<string>(defaultImage);
    const [files, setFiles] = useState<
        {
            link: string;
            file: File;
        }[]
    >([defaultFile]);
    const dispatch = useAppDispatch();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = getFormDate(event.currentTarget);
        const images = new FormData();
        for (const file of files) {
            images.append("images", file.file);
        }
        dispatch(postImageUploadAsync(images)).then(({ payload }) => {
            onSubmit(form.text as string, payload as number[]);
        });
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            const link = URL.createObjectURL(file);
            setImages([link, ...images]);
            setFiles([
                {
                    link: link,
                    file: file,
                },
                ...files,
            ]);
        }
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
        }
    };

    useEffect(() => {
        setselectedImg(images[0]);
    }, [images]);

    return (
        <div className="post-view">
            <div className="post-view__header">
                <button
                    type="button"
                    className="post-view__close button-reset-default-styles"
                    onClick={onClose}
                >
                    &times;
                </button>
                <span>Просмотр</span>
            </div>
            <div className="post-view__preview">
                <img
                    src={selectedImg}
                    alt=""
                    className="post-view__preview-img"
                />
            </div>
            <div className="post-view__images">
                <label className="post-form__text-label">
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hide-elements"
                        name="image"
                        onChange={handleChange}
                    />
                    <div className="post-form__image-input">
                        <Icon width={22} height={19}>
                            <AddImageIcon />
                        </Icon>
                    </div>
                </label>
                {images.map((link, index) => (
                    <div
                        key={index + link}
                        style={{
                            position: "relative",
                        }}
                    >
                        <button
                            type="button"
                            className="post-modal__image-delete button-reset-default-styles"
                            onClick={() => handleDeleteImage(link)}
                        >
                            &times;
                        </button>
                        <button
                            className={CN(
                                "post-view__image button-reset-default-styles",
                                {
                                    "post-view__image--selected":
                                        selectedImg === link,
                                }
                            )}
                            key={index + link}
                            onClick={() => setselectedImg(link)}
                        >
                            <img
                                src={link}
                                alt=""
                                className="post-view__image-img"
                            />
                        </button>
                    </div>
                ))}
            </div>
            <PostForm onSubmit={handleSubmit} defaultText={defaultText} />
            <style jsx>{`
                .post-view {
                    background: #ececec;
                    padding: 0 16px 16px;
                }
                .post-view__header {
                    padding: 12px 0;
                    display: flex;
                    align-items: center;
                    column-gap: 32px;
                }

                .post-view__close {
                    font-size: 24px;
                    font-weight: 100;
                }

                .post-view__preview {
                    min-height: 500px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .post-view__preview-img {
                    width: 422px;
                    height: 422px;
                    padding: 20px 0;
                    object-fit: cover;
                }

                .post-view__images {
                    display: flex;
                    align-items: center;
                    margin: 10px 0;
                    column-gap: 8px;
                }

                .post-form__image-input {
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

                .post-view__image {
                    width: 74px;
                    height: 74px;
                    background: #ffffff;
                    border: 1px solid transparent;
                    border-radius: 6px;
                }

                .post-view__image--selected {
                    border-color: #e56366;
                }

                .post-view__image-img {
                    width: 100%;
                    height: 100%;
                    max-height: 430px;
                    object-fit: cover;
                }
                .post-modal__image-delete {
                    position: absolute;
                    right: 5px;
                    top: 0px;
                    font-size: 17px;
                    line-height: initial;
                }
            `}</style>
        </div>
    );
}
