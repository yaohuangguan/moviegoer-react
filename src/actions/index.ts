import { fetchSignup, fetchUserLogin } from '../service';
import { HANDLE_USER_SIGNUP, HANDLE_USER_LOGIN } from './constant'
import { dispatcher } from 'react-dispatch'

async function handleFetchAndDispatch(fn: { (callbackData: any): Promise<void> }, data: { type: any; payload?: any; }) {
    const { type, payload } = data;

    const response = await fn(payload);

    dispatcher.dispatch(type, response);
}

export const dispatch = async (data: { type: any; payload?: any; }) => {
    const { type } = data;

    switch (type) {
        case HANDLE_USER_SIGNUP:
            return handleFetchAndDispatch(fetchSignup, data);

        case HANDLE_USER_LOGIN:
            return handleFetchAndDispatch(fetchUserLogin, data);
    }

}