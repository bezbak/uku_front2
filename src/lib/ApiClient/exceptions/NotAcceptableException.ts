import ApiException from "./ApiException";

class NotAcceptableException extends ApiException {
    constructor(public message: string) {
        super(406, message);
    }
}

export default NotAcceptableException;
