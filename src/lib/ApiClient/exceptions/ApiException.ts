class ApiException extends Error {
    constructor(public readonly code: number, public readonly message: string) {
        super();
    }
}

export default ApiException;
