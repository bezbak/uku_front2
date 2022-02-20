import ApiException from "./ApiException";

class ServerErrorException extends ApiException {
    constructor(public message: string) {
        super(500, message);
    }
}

export default ServerErrorException;
