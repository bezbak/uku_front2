import ApiException from "./ApiException";

class NotAllowedException extends ApiException {
    constructor(public message: string) {
        super(405, message);
    }
}

export default NotAllowedException;
