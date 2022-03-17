import {
    array,
    boolean,
    literal,
    nullable,
    number,
    object,
    string,
    union,
} from "superstruct";

export const ProfileFeedItemSchema = object({
    id: number(),
    categories: string(),
    user: object({
        id: number(),
        first_name: string(),
        last_name: string(),
        avatar: nullable(string()),
        location: string(),
        following: boolean(),
    }),
    title: string(),
    description: string(),
    created_at: string(),
    viewed: number(),
    images: array(
        object({
            id: number(),
            image: string(),
        })
    ),
    is_favorite: boolean(),
    comment_count: number(),
    publication_type: string(),
    location: object({
        id: number(),
        name: string(),
    }),
    is_owner: boolean(),
    status: union([
        literal("on moderation"),
        literal("active"),
        literal("inactive"),
        literal("blocked"),
    ]),
    link: string(),
});

export const ProfileFeedSchema = object({
    count: number(),
    next: nullable(number()),
    previous: nullable(string()),
    results: array(ProfileFeedItemSchema),
});

export const ProfileInfoSchema = object({
    id: number(),
    first_name: string(),
    last_name: string(),
    phone: string(),
    avatar: nullable(string()),
    followers_count: number(),
    following_count: number(),
    publications_count: number(),
    instagram: nullable(string()),
    telegram: nullable(string()),
    whatsapp: nullable(string()),
    following: boolean(),
    gender: string(),
    age: number(),
    status: union([literal("active"), literal("blocked")]),
});

export const oldPhoneSchema = object({
    message: string(),
    success: boolean(),
});

export const UpdateProfileSchema = object({
    instagram: nullable(string()),
    telegram: nullable(string()),
    whatsapp: nullable(string()),
});
