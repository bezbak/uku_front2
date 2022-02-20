import { array, number, object, string } from "superstruct";

const LocationSchema = array(
    object({
        id: number(),
        name: string(),
        children: array(object()),
    })
);

export default LocationSchema;
