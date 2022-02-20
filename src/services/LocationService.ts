import { ApiClientInterface } from "@/lib/ApiClient";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";
import LocationSchema from "./schemas/LocationSchema";
import { ILocation } from "./types";

class LocationService {
    constructor(private readonly api: ApiClientInterface) {}
    getLocations() {
        const request = this.api.get("/location");
        assertApiResponse<ILocation>(request, LocationSchema);
        return request;
    }
}

export default LocationService;
