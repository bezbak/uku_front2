import ApiException from "./ApiException";

class GatewayTimeoutException extends ApiException {
    constructor(public message: string) {
        super(504, message);
    }
}

export default GatewayTimeoutException;
