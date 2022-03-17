import { TokenManagerDiToken } from "@/lib/TokenManager";
import { container } from "tsyringe";

export const useGetToken = () => {
    const tokenManager = container.resolve(TokenManagerDiToken);
    const token = tokenManager.getToken();
    return token;
};
