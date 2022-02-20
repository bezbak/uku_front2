import { boolean, nullable, number, object, string } from "superstruct";

export const AuthSchema = object({
    message: string(),
});

export const ConfirmSchema = object({
    token: string(),
    is_profile_completed: boolean(),
    region_detail: nullable(
        object({
            id: number(),
            name: string(),
        })
    ),
});
