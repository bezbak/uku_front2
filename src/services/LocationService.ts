import { ApiClientInterface } from "@/lib/ApiClient";
import { ILocation } from "./types";
import LocationSchema from "./schemas/LocationSchema";
import { assertApiResponse } from "@/lib/ApiClient/helpers/assertApiResponse";

class LocationService {
    constructor(private readonly api: ApiClientInterface) {}
    getLocations() {
        const request = this.api.get("/location/");
        assertApiResponse<ILocation>(request, LocationSchema);
        return request;
    }
}

export default LocationService;
