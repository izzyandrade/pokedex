import { Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import { rootReducer } from "../ducks";
import { RootState } from "../ducks/state";

const persistConfig = {
  key: "root",
  storage: ExpoFileSystemStorage,
};

export function configureStore(
  initialState?: RootState
): { store: Store<RootState>; persistor: any } {
  let middleware = applyMiddleware(thunk);

  // @ts-ignore
  const persistedReducer = persistReducer(persistConfig as any, rootReducer);

  const store = createStore(
    persistedReducer as any,
    initialState || ({} as any),
    middleware
  ) as Store<RootState>;
  let persistor = persistStore(store);

  persistor.purge();

  return { store, persistor };
}
