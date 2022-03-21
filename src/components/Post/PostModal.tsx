import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { editPost, selectCategoryId, selectEditPost } from "@/app/mainSlice";
import { postImageUploadAsync, updatePostAsync } from "./PostSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import AddImageIcon from "../icons/AddImageIcon";
import Button from "../Buttons/Button";
import CN from "classnames";
import Icon from "../Icon";
import Modal from "../Modal/Modal";
import PostForm from "./PostForm";
import getFormDate from "@/utils/getFormData";
import { useRouter } from "next/router";

export default function PostModal() {
    const rout = useRouter();
    const editingPost = useAppSelector(selectEditPost);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [description, setDescription] = useState(editingPost?.description);
    const categoryId = useAppSelector(selectCategoryId);
    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(editPost(null));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            setImages([URL.createObjectURL(file), ...images]);
            setFiles([file, ...files]);
        }
    };

    const updatePost = async (text: string, images?: number[]) => {
        try {
            if (!editingPost) return;
            await dispatch(
                updatePostAsync({
                    category: categoryId as number,
                    description: text,
                    location: 3,
                    images,
                    postId: editingPost.id,
                })
            );
            onClose();
            rout.reload();
        } catch (error: unknown) {}
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = getFormDate(event.currentTarget);
        if (images.length > 0) {
            const formData = new FormData();
            for (const file of files) {
                formData.append("images", file);
            }
            dispatch(postImageUploadAsync(formData)).then(({ payload }) => {
                updatePost(form.text as string, payload as number[]);
            });
        } else {
            updatePost(form.text as string);
        }
    };

    useEffect(() => {
        const images = editingPost?.images.reduce<string[]>((prev, curr) => {
            return [...prev, curr.image];
        }, []);
        if (images) {
            setImages(images);
            setSelectedImg(images[0]);
        }
        if (editingPost) setDescription(editingPost.description);
    }, [editingPost]);

    useEffect(() => {
        setSelectedImg(images[0]);
    }, [images]);

    return (
        <Modal open={!!editingPost}>
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
                    </div>
                    <div className="post-view__header-right">
                        <Button type="button">
                            {editingPost?.category.name.slice(
                                editingPost?.category.name.lastIndexOf(",") + 1
                            )}
                        </Button>
                        <Button type="button">
                            {editingPost?.location.name}
                        </Button>
                    </div>
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
                            <button
                                className={CN(
                                    "post-modal__image button-reset-default-styles",
                                    {
                                        "post-modal__image--selected":
                                            selectedImg === image,
                                    }
                                )}
                                key={index + image}
                                onClick={() => setSelectedImg(image)}
                            >
                                <img
                                    src={image}
                                    alt=""
                                    className="post-modal__image-img"
                                />
                            </button>
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
                    <PostForm
                        onSubmit={handleSubmit}
                        onChange={(event) =>
                            setDescription(event.currentTarget.value)
                        }
                        description={description}
                    />
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
                `}</style>
                <style jsx global>{``}</style>
            </div>
        </Modal>
    );
}
