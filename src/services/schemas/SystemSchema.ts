import { number, object, string } from "superstruct";

export const FaqSchema = object({
    id: number(),
    question: string(),
    answer: string(),
});

export const AgreementSchema = object({
    id: number(),
    title: string(),
    description: string(),
});
