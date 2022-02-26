import { AuthSchema, ConfirmSchema } from "./schemas/AccountSchema";
import {
    ProfileFeedItemSchema,
    ProfileFeedSchema,
    ProfileInfoSchema,
    UpdateProfileSchema,
    oldPhoneSchema,
} from "./schemas/ProfileSchema";

import { Infer } from "superstruct";
import LocationSchema from "./schemas/LocationSchema";

export type IAuth = Infer<typeof AuthSchema>;
export type IConfirm = Infer<typeof ConfirmSchema>;
export type ILocation = Infer<typeof LocationSchema>;
export type IProfileFeed = Infer<typeof ProfileFeedSchema>;
export type IProfileFeedItem = Infer<typeof ProfileFeedItemSchema>;
export type IprofileInfo = Infer<typeof ProfileInfoSchema>;
export type IOldPhoneChnage = Infer<typeof oldPhoneSchema>;
export type IUpdateProfile = Infer<typeof UpdateProfileSchema>;
