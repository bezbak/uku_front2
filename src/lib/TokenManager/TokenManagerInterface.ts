export interface TokenManagerInterface {
    getToken: () => string | null;
    discardToken: () => void;
    setToken: (token: string) => void;
}
