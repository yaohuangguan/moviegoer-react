import React from "react";
const ReduxContext = React.createContext("redux");

export const initialState = {
  userAuth: false,
  theme: "light",
};

const createStore = (rootReducer: {
  (arg0: any, arg1: any): any;
  userAuth?: boolean;
  theme?: string;
}) => {
  let state: any;
  let listeners: any[] = [];

  const getState = () => state;

  const dispatch = (action: {}) => {
    state = rootReducer(state, action);
    listeners.forEach((listener) => listener(state));
  };

  const subscribe = (listener: any) => {
    listeners.push(listener);
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const combineReducers = (reducers: { [x: string]: any }) => {
  const nextState: any = {};
  const reducerFunctions: any = {};
  const reducersKeys = Object.keys(reducers);
  reducersKeys.forEach((reducerKey) => {
    if (typeof reducers[reducerKey] === "function") {
      reducerFunctions[reducerKey] = reducers[reducerKey];
    }
  });
  const reducerFunctionsKeys = Object.keys(reducerFunctions);

  return (state = {}, action: any) => {
    reducerFunctionsKeys.forEach((reducerKey) => {
      const reducer = reducerFunctions[reducerKey];
      //@ts-ignore
      nextState[reducerKey] = reducer(state[reducerKey], action);
    });

    return nextState;
  };
};

const Provider = ({ value, children }: any) => (
  <ReduxContext.Provider value={value}>{children}</ReduxContext.Provider>
);

const connect =
  (
    mapStateToProps: (arg0: any) => void,
    mapDispatchToProps: (arg0: any) => void
  ) =>
  (Component: any) => {
    class Connect extends React.Component {
      constructor(props: any) {
        super(props);

        this.state = props.store.getState();
      }

      componentDidMount() {
        //@ts-ignore
        this.props.store.subscribe(
          (
            state:
              | {}
              | ((
                  prevState: Readonly<{}>,
                  props: Readonly<{}>
                ) => {} | Pick<{}, never> | null)
              | Pick<{}, never>
              | null
          ) => {
            this.setState(state);
          }
        );
      }

      render() {
        //@ts-ignore
        const { store } = this.props;

        return (
          <Component
            {...this.props}
            {...mapStateToProps(store.getState())}
            {...mapDispatchToProps(store.dispatch)}
          />
        );
      }
    }

    return (props: any) => (
      <ReduxContext.Consumer>
        {(store) => <Connect {...props} store={store} />}
      </ReduxContext.Consumer>
    );
  };

export { createStore, combineReducers, connect, Provider };
