export interface ApiResponseInterface<T> {
    data: T;
    headers: Record<string, string>;
    status: number;
}

export class ApiResponse<T> implements ApiResponseInterface<T> {
    constructor(
        public readonly data: T,
        public readonly status: number,
        public readonly headers: Record<string, string>
    ) {}
}
