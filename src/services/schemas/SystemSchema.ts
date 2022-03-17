import { array, nullable, number, object, string } from "superstruct";

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

export const ContactSchema = object({
    id: number(),
    title: string(),
    description: string(),
    image: string(),
    telegram: nullable(string()),
    facebook: nullable(string()),
    instagram: nullable(string()),
    address: nullable(string()),
    phone_numbers: array(
        object({
            id: number(),
            phone: string(),
        })
    ),
});
