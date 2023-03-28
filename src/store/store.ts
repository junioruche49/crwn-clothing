import { compose, applyMiddleware, createStore, Middleware } from "redux";
import { rootReducer } from "./root-reducer";
import logger from "redux-logger";
import { persistReducer, persistStore, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import createSagaMiddleWare from "redux-saga";
import { rootSaga } from "./root-saga";

declare global{
  interface Window{
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleWare = createSagaMiddleWare();

const middleware = [logger, sagaMiddleWare].filter((middleware):middleware is Middleware=>Boolean(middleware));

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleware));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleWare.run(rootSaga);
export const persistor = persistStore(store);
