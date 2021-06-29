import { Api } from "../tools/axios";
import { message } from "antd"

const authErrorInterceptor = (err: any) => {
    message.error(err);
    return Promise.reject(err);
}


export function fetchSignup(callbackData: {
    email: string;
    displayName: string;
    phone?: string;
    password: string;
}) {
    return Api({
        method: "POST",
        data: {
            ...callbackData,
        },
        url: "/api/users",
    }).catch(authErrorInterceptor);
};


export function fetchUserLogin(callbackData: {
    email: string;
    password: string;
}) {
    return Api({
        method: "POST",
        data: {
            ...callbackData,
        },
        url: "/api/users/signin",
    }).catch(authErrorInterceptor);
}

