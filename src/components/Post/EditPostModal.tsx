import React, { useEffect, useState } from "react";
import { editPost, selectCategoryId, selectEditPost } from "@/app/mainSlice";
import { postImageUploadAsync, updatePostAsync } from "./PostSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import Modal from "../Modal/Modal";
import PostModal from "./PostModal";
import { useRouter } from "next/router";

export default function EditPostModal() {
    const rout = useRouter();
    const editingPost = useAppSelector(selectEditPost);
    const categoryId = useAppSelector(selectCategoryId);
    const [images, setImages] = useState<string[]>([]);
    const [post, setPost] = useState(editingPost);
    const dispatch = useAppDispatch();
    const onClose = () => {
        dispatch(editPost(null));
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

    const handleSubmit = (text: string, images: File[]) => {
        if (images.length > 0) {
            const formData = new FormData();
            for (const file of images) {
                formData.append("images", file);
            }
            dispatch(postImageUploadAsync(formData)).then(({ payload }) => {
                updatePost(text, payload as number[]);
            });
        } else {
            updatePost(text);
        }
    };

    useEffect(() => {
        const images = editingPost?.images.reduce<string[]>((prev, curr) => {
            return [...prev, curr.image];
        }, []);
        if (images) {
            setImages(images);
        }
        setPost(editingPost);
    }, [editingPost]);

    return (
        <Modal open={!!editingPost} scrollableClass="post-modal__scroleble">
            <PostModal
                defaultImages={images}
                onClose={onClose}
                onSubmit={handleSubmit}
                defaultText={post?.description}
                categoryName={post?.category.name}
                locationName={post?.location.name}
            />
        </Modal>
    );
}
