import CookiesManager from "../CookiesManager/CookiesManager";
import { TokenManagerInterface } from ".";
import { singleton } from "tsyringe";

const UKU_TOKEN_COOKIE_KEY = "UKU_TOKEN";

@singleton()
export class TokenManager implements TokenManagerInterface {
    constructor(private readonly cookiesManager: CookiesManager) {}

    private getCookie(name: string): string | null {
        return this.cookiesManager.get(name) || null;
    }

    getToken(): string | null {
        return this.getCookie(UKU_TOKEN_COOKIE_KEY);
    }

    setToken(token: string): void {
        this.cookiesManager.set(UKU_TOKEN_COOKIE_KEY, token);
    }

    discardToken(): void {
        this.cookiesManager.remove(UKU_TOKEN_COOKIE_KEY);
    }
}
