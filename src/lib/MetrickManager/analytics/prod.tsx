import { ym } from "react-ym";

const IS_BROWSER = typeof window !== "undefined";

let key: string;

export function init(code: string, options?: Object) {
    key = `yaCounter${code}`;

    if (IS_BROWSER && !window[key as any] && code) {
        ym.initialize(code, options);
    }
}

export function pageview() {
    if (window[key as any]) {
        (window[key as any] as any).hit(window.location.pathname);
    }
}

export function reachGoal(...args: any) {
    if (window[key as any]) {
        (window[key as any] as any).reachGoal(...args);
    }
}
