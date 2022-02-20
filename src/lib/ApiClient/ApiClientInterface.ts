import { ApiRequestInterface } from "./ApiRequest";
import { ApiRequestConfigInterface } from "./ApiRequestConfigInterface";

// TODO: Удалить женерик тип T = unknown у методов апи клиента, по стандарту установить возвращаемый тип ApiRequestInterface<unknown>
// сейчас этого не сделал потому что слишком долго во всех сервисах менять

export interface ApiClientInterface {
    get: <T = unknown>(
        path: string,
        options?: ApiRequestConfigInterface
    ) => ApiRequestInterface<T>;
    post: <T = unknown>(
        path: string,
        data?: any,
        options?: ApiRequestConfigInterface
    ) => ApiRequestInterface<T>;
    put: <T = unknown>(
        path: string,
        data?: any,
        options?: ApiRequestConfigInterface
    ) => ApiRequestInterface<T>;
    delete: <T = unknown>(
        path: string,
        options?: ApiRequestConfigInterface
    ) => ApiRequestInterface<T>;
    patch: <T = unknown>(
        path: string,
        data?: any,
        options?: ApiRequestConfigInterface
    ) => ApiRequestInterface<T>;
}
