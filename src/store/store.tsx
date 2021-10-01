import { Reducer, useImmerReducer } from "use-immer";


const initialState = {
  userAuth: false,
};

export const createStore = (reducer: Reducer<{ userAuth: boolean }, any>) => {
  const [state, dispatchReducer] = useImmerReducer(reducer, initialState);

   const getState = () => state;

  return { getState, dispatchReducer };
};
