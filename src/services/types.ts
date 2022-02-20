import { Infer } from "superstruct";
import { AuthSchema, ConfirmSchema } from "./schemas/AccountSchema";
import LocationSchema from "./schemas/LocationSchema";

export type IAuth = Infer<typeof AuthSchema>;
export type IConfirm = Infer<typeof ConfirmSchema>;
export type ILocation = Infer<typeof LocationSchema>;
