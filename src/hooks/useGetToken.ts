import { TokenManagerDiToken } from "@/lib/TokenManager";
import { container } from "tsyringe";
import { useEffect } from "react";

export const useGetToken = () => {
    const tokenManager = container.resolve(TokenManagerDiToken);
    let token = tokenManager.getToken();
    useEffect(() => {
        token = tokenManager.getToken();
    }, []);

    return token;
};
