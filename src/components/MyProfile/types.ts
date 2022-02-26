import { Infer, object, size, string } from "superstruct";

export const EditProfileSchema = object({
    instagram: size(string(), 0, 50),
    whatsapp: size(string(), 0, 50),
    telegram: size(string(), 0, 50),
});

export type IEditProfile = Infer<typeof EditProfileSchema>;
