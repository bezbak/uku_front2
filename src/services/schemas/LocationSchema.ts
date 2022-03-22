import { array, number, object, string } from "superstruct";

const LocationSchema = object({
    id: number(),
    name: string(),
    children: array(object()),
});

export default LocationSchema;
