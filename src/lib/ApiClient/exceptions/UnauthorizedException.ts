import ApiException from "./ApiException";

class UnauthorizedException extends ApiException {
    constructor(public message: string) {
        super(401, message);
    }
}

export default UnauthorizedException;
