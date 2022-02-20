import { ApiResponse, ApiResponseInterface } from "./ApiResponse";

import { ApiClientInterface } from "./ApiClientInterface";
import { ApiRequest } from "./ApiRequest";
import { ApiRequestConfigInterface } from "./ApiRequestConfigInterface";
import type { AxiosApiOptionsInterface } from "./AxiosApiOptionsInterface";
import type { AxiosInstance } from "axios";
import QS from "query-string";
import axios from "axios";
import { singleton } from "tsyringe";
import BadRequestException from "./exceptions/BadRequestException";
import ForbiddenException from "./exceptions/ForbiddenException";
import UnauthorizedException from "./exceptions/UnauthorizedException";
import NotFoundException from "./exceptions/NotFoundException";
import NotAllowedException from "./exceptions/NotAllowedException";
import NotAcceptableException from "./exceptions/NotAcceptableException";
import GatewayTimeoutException from "./exceptions/GatewayTimeoutException";
import ServerErrorException from "./exceptions/ServerErrorException";
import { ApiException } from ".";

@singleton()
export class ApiClient implements ApiClientInterface {
    protected axios: AxiosInstance;

    constructor(baseURL: string, options?: AxiosApiOptionsInterface) {
        this.axios = axios.create({
            baseURL,
            headers: {
                ...options?.headers,
            },
            params: options?.params,
            paramsSerializer: (params) => {
                return QS.stringify(params, {
                    skipEmptyString: true,
                });
            },
        });
        this.axios.interceptors.request.use((config) => {
            config.params = config.params || {};
            return config;
        });
    }

    public get<T>(
        path: string,
        options: ApiRequestConfigInterface = {}
    ): ApiRequest<T> {
        const source = axios.CancelToken.source();

        return new ApiRequest(
            this.axios
                .get(path, { ...options, cancelToken: source.token })
                .then((res) => {
                    return new ApiResponse<T>(
                        res.data,
                        res.status,
                        res.headers
                    );
                })
                .catch(this.handleErrors) as Promise<ApiResponseInterface<T>>,
            source.cancel
        );
    }

    public post<T>(
        path: string,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        data?: any,
        options?: ApiRequestConfigInterface
    ): ApiRequest<T> {
        const source = axios.CancelToken.source();

        return new ApiRequest(
            this.axios
                .post(path, data, { ...options, cancelToken: source.token })
                .then((res) => {
                    return new ApiResponse<T>(
                        res.data,
                        res.status,
                        res.headers
                    );
                })
                .catch(this.handleErrors) as Promise<ApiResponseInterface<T>>,
            source.cancel
        );
    }

    public put<T>(
        path: string,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        data?: any,
        options?: ApiRequestConfigInterface
    ): ApiRequest<T> {
        const source = axios.CancelToken.source();

        return new ApiRequest(
            this.axios
                .put(path, data, { ...options, cancelToken: source.token })
                .then((res) => {
                    return new ApiResponse<T>(
                        res.data,
                        res.status,
                        res.headers
                    );
                })
                .catch(this.handleErrors) as Promise<ApiResponseInterface<T>>,
            source.cancel
        );
    }

    public delete<T>(
        path: string,
        options?: ApiRequestConfigInterface
    ): ApiRequest<T> {
        const source = axios.CancelToken.source();

        return new ApiRequest(
            this.axios
                .delete(path, { ...options, cancelToken: source.token })
                .then((res) => {
                    return new ApiResponse<T>(
                        res.data,
                        res.status,
                        res.headers
                    );
                })
                .catch(this.handleErrors) as Promise<ApiResponseInterface<T>>,
            source.cancel
        );
    }

    public patch<T>(
        path: string,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        data?: any,
        options?: ApiRequestConfigInterface
    ) {
        const source = axios.CancelToken.source();

        return new ApiRequest(
            this.axios
                .patch(path, data, { ...options, cancelToken: source.token })
                .then((res) => {
                    return new ApiResponse<T>(
                        res.data,
                        res.status,
                        res.headers
                    );
                })
                .catch(this.handleErrors) as Promise<ApiResponseInterface<T>>,
            source.cancel
        );
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    protected handleErrors(error: any): void {
        if (axios.isAxiosError(error) && error.response?.status) {
            const code = error.response?.status || 0;
            const message = error.response?.data.message || error.message;

            if (code === 400) throw new BadRequestException(message);
            else if (code === 403) throw new ForbiddenException(message);
            else if (code === 401) throw new UnauthorizedException(message);
            else if (code === 404) throw new NotFoundException(message);
            else if (code === 405) throw new NotAllowedException(message);
            else if (code === 406) throw new NotAcceptableException(message);
            else if (code === 504) throw new GatewayTimeoutException(message);
            else if (code === 500) throw new ServerErrorException(message);
            else throw new ApiException(code, message);
        }

        throw error;
    }
}
