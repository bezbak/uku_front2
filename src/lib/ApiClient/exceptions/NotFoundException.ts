import ApiException from "./ApiException";

class NotFoundException extends ApiException {
    constructor(public message: string) {
        super(404, message);
    }
}

export default NotFoundException;
