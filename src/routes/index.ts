import Home from '../views/home';
import HotSpot from '../views/hotspot';

export interface IRoute {
    path: string;
    name: string;
    component: React.ReactNode;
    effect: string;
    timeout: number;
    routes?: IArrayRoutes;
    exact?: boolean;
};

export interface IArrayRoutes extends Array<IRoute> { }

const routes: IArrayRoutes = [
    {
        path: '/',
        name: '主程',
        component: Home,
        effect: 'none',
        timeout: 0,
        exact: true,
        routes: [
            {
                path: '/spotlights',
                name: '',
                component: HotSpot,
                effect: 'none',
                timeout: 0,
            },
        ],
    },
]

export default routes;