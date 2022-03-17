import { array, nullable, number, object, string } from "superstruct";

export const CategoryListSchema = object({
    id: number(),
    name: string(),
    category_type: nullable(string()),
    children: array(object()),
    image: nullable(string()),
});
