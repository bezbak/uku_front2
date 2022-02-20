import { ApiResponseInterface } from "./ApiResponse";

export interface ApiRequestInterface<T> {
    response: Promise<ApiResponseInterface<T>>;
    cancel(): void;
}

export class ApiRequest<T> implements ApiRequestInterface<T> {
    constructor(
        public readonly response: ApiRequestInterface<T>["response"],
        public readonly cancel: ApiRequestInterface<T>["cancel"]
    ) {}
}
