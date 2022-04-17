import Modal from "../Modal/Modal";
import PostModal from "./PostModal";
import React, { useState } from "react";
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
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (text: string, images: File[]) => {
        const formData = new FormData();
        for (const file of images) {
            formData.append("images", file);
        }
        if (defaultFile) {
            formData.append("images", defaultFile);
        }
        setLoading(true);
        const { payload } = await dispatch(postImageUploadAsync(formData));
        if (Array.isArray(payload as any)) onSubmit(text, payload as number[]);
        setLoading(false);
    };

    return (
        <Modal open={open} scrollableClass="post-modal__scroleble">
            {!!open && (
                <PostModal
                    defaultImages={defaultImage ? [defaultImage] : []}
                    onClose={onClose}
                    onSubmit={handleSubmit}
                    defaultText={defaultText}
                    loading={loading}
                />
            )}
        </Modal>
    );
}
