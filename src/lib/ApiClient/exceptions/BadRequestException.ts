import ApiException from "./ApiException";

class BadRequestException extends ApiException {
    constructor(public message: string) {
        super(400, message);
    }
}

export default BadRequestException;
