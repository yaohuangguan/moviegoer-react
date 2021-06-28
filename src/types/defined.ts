import { RouterProps, StaticRouterProps } from "react-router";

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