import {
    Infer,
    literal,
    number,
    object,
    size,
    string,
    union,
} from "superstruct";

export const registerFormSchema = object({
    last_name: size(string(), 1, Infinity),
    first_name: size(string(), 1, Infinity),
    gender: union([literal("male"), literal("female")]),
    birth_date: size(string(), 1, 10),
    rule: literal("on"),
    regionText: string(),
    region: number(),
});

export const confirmFormSchema = object({
    code: size(string(), 6, 6),
});

export type IRegisterSchema = Infer<typeof registerFormSchema>;

export interface IErroType {
    [key: string]: boolean;
}
