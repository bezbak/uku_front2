import Modal from "../Modal/Modal";
import PostModal from "./PostModal";
import React from "react";
import { postImageUploadAsync } from "./PostSlice";
import { useAppDispatch } from "@/app/hooks";

interface ICreatePostModal {
    open: boolean;
    defaultText?: string;
    defaultImage?: string | null;
    defaultFile?: File | null;
    onClose: () => void;
    onSubmit: (text: string, images?: number[]) => void;
}

export default function CreatePostModal({
    open,
    defaultText,
    defaultImage,
    defaultFile,
    onClose,
    onSubmit,
}: ICreatePostModal) {
    const dispatch = useAppDispatch();
    const handleSubmit = (text: string, images: File[]) => {
        if (images.length > 0) {
            const formData = new FormData();
            for (const file of images) {
                formData.append("images", file);
            }
            if (defaultFile) {
                formData.append("images", defaultFile);
            }
            dispatch(postImageUploadAsync(formData)).then(({ payload }) => {
                onSubmit(text, payload as number[]);
            });
        } else {
            onSubmit(text);
        }
    };

    return (
        <Modal open={open} scrollableClass="post-modal__scroleble">
            {!!open && (
                <PostModal
                    defaultImages={defaultImage ? [defaultImage] : []}
                    onClose={onClose}
                    onSubmit={handleSubmit}
                    defaultText={defaultText}
                />
            )}
        </Modal>
    );
}
