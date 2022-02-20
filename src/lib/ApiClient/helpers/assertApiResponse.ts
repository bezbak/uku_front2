import { Struct, assert } from "superstruct";

import { ApiRequestInterface } from "../ApiRequest";

/**
 * Функция хелпер которая утверждает тип респонса заменяя промис респонса на новый с валидацией
 */

export function assertApiResponse<T>(
    request: ApiRequestInterface<unknown>,
    struct: Struct<T>
): asserts request is ApiRequestInterface<T> {
    request.response = request.response.then((response) => {
        assert(response.data, struct);
        return response;
    });
}
