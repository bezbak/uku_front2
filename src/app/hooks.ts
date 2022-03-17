import type { AppDispatch, AppState } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import type { ChangeEvent } from "react";

export const useForm =
    <TContent>(defaultValues: TContent) =>
    (handler: (content: TContent) => void) =>
    async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.persist();

        const form = event.target as HTMLFormElement;
        const elements = Array.from(form.elements) as HTMLInputElement[];
        const data = elements
            .filter((element) => element.hasAttribute("name"))
            .reduce(
                (object, element) => ({
                    ...object,
                    [`${element.getAttribute("name")}`]: element.value,
                }),
                defaultValues
            );
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await handler(data);
        form.reset();
    };

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// eslint-disable-next-line @typescript-eslint/ban-types
export const useInterval = (callback: Function, delay: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const savedCallback = useRef<Function>();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        const handler = (...args: any) => savedCallback.current?.(...args);

        if (delay !== null) {
            const id = setInterval(handler, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
