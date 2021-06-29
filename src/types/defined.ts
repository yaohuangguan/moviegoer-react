import { RouterProps, StaticRouterProps } from "react-router";
import { BrowserRouterProps } from "react-router-dom";

export interface IDefinedCentralProps {
    children?: React.ReactChildren;
    history: RouterProps;
    location: {
        hash: string;
        key: string;
        pathname: string;
        search: string;
        state: undefined | any
    };
    match: {
        isExact: boolean;
        params: {} | any;
        path: string;
        url: string;
    };
    staticContext: StaticRouterProps | undefined;
}

export interface IUserObj {
    id: number;
    name: string;
    phone?: string;
    email?: string;
    age?: number;
    avatar: string;
}

export interface IComponentOfApp {
    handleUserAuthAction: (cbData: { username: string; password: string; phone?: string; email: string; }, authType: number) => void;
    openAuthModal: () => void;
    userAuth: IUserObj | boolean;
}