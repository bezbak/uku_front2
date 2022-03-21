import {
    AgreementSchema,
    ContactSchema,
    FaqSchema,
} from "./schemas/SystemSchema";
import {
    AuthSchema,
    ConfirmSchema,
    FollowSchema,
} from "./schemas/AccountSchema";
import {
    CommentSchema,
    PublicationCreateSchema,
    PublicationSchema,
} from "./schemas/PublicationSchema";
import {
    ProfileFeedItemSchema,
    ProfileFeedSchema,
    ProfileInfoSchema,
    UpdateProfileSchema,
    oldPhoneSchema,
} from "./schemas/ProfileSchema";

import { CategoryListSchema } from "./schemas/CategorySchema";
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
export type IFaq = Infer<typeof FaqSchema>;
export type IAgreemnet = Infer<typeof AgreementSchema>;
export type ICategoryList = Infer<typeof CategoryListSchema>;
export type IContact = Infer<typeof ContactSchema>;
export type IFollow = Infer<typeof FollowSchema>;
export type IPublication = Infer<typeof PublicationSchema>;
export type IComment = Infer<typeof CommentSchema>;
export type IPublicationCrate = Infer<typeof PublicationCreateSchema>;
