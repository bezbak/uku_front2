import Cookie, { CookieAttributes, CookiesStatic } from "js-cookie";

export class CookiesManager {
    private cookie: CookiesStatic;
    constructor() {
        this.cookie = Cookie;
    }
    get(key: string): string | undefined {
        return this.cookie.get(key);
    }

    set(
        key: string,
        value: string,
        options?: CookieAttributes
    ): string | undefined {
        return this.cookie.set(key, value, options);
    }

    remove(key: string): void {
        return this.cookie.remove(key);
    }
}

export default CookiesManager;
