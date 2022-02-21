import { Infer } from "superstruct";
import { AuthSchema, ConfirmSchema } from "./schemas/AccountSchema";
import LocationSchema from "./schemas/LocationSchema";
import {
    ProfileFeedItemSchema,
    ProfileFeedSchema,
} from "./schemas/ProfileSchema";

export type IAuth = Infer<typeof AuthSchema>;
export type IConfirm = Infer<typeof ConfirmSchema>;
export type ILocation = Infer<typeof LocationSchema>;
export type IProfileFeed = Infer<typeof ProfileFeedSchema>;
export type IProfileFeedItem = Infer<typeof ProfileFeedItemSchema>;
