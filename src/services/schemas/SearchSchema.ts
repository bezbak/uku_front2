import { array, nullable, number, object, string } from "superstruct";

export const UserSearchSchema = object({
    count: number(),
    next: nullable(number()),
    previous: nullable(number()),
    results: array(
        object({
            id: number(),
            first_name: string(),
            last_name: string(),
            avatar: nullable(string()),
            phone: string(),
        })
    ),
});

export const CategorySearchSchema = object({
    count: number(),
    next: nullable(number()),
    previous: nullable(number()),
    results: array(
        object({
            id: number(),
            name: string(),
            image: nullable(string()),
        })
    ),
});
