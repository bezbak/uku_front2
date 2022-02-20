import ApiException from "./ApiException";

class ForbiddenException extends ApiException {
    constructor(public message: string) {
        super(403, message);
    }
}

export default ForbiddenException;
