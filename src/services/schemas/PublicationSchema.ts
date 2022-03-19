import { array, boolean, nullable, number, object, string } from "superstruct";

import { ProfileInfoSchema } from "./ProfileSchema";

export const CommentSchema = object({
    id: number(),
    image: nullable(string()),
    author: object({
        avatar: nullable(string()),
        first_name: string(),
        id: number(),
        last_name: string(),
    }),
    created_at: string(),
    replies: array(),
    reply_to_user: nullable(string()),
    text: string(),
});

export const PublicationSchema = object({
    blocking_reason_text: nullable(string()),
    category: object({
        id: number(),
        name: string(),
    }),
    comments: array(CommentSchema),
    created_at: string(),
    description: string(),
    id: number(),
    images: array(
        object({
            id: number(),
            image: string(),
        })
    ),
    is_favorite: boolean(),
    is_owner: boolean(),
    link: string(),
    location: object({
        id: number(),
        name: string(),
    }),
    publication_type: string(),
    status: string(),
    title: string(),
    viewed: number(),
    user: ProfileInfoSchema,
});
