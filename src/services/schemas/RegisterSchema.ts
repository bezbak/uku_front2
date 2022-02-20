import { number, object, string } from "superstruct";

const RegisterSchema = object({
    first_name: string(),
    last_name: string(),
    gender: string(),
    birth_date: string(),
    region: number(),
    region_detail: string(),
});

export default RegisterSchema;
