import { number, object, string } from "superstruct";

export const FaqSchema = object({
    id: number(),
    question: string(),
    answer: string(),
});
